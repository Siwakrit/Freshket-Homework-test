// เก็บข้อมูลเมนูและราคาต่อเซ็ต
const menuPrices = {
    Red: 50,
    Green: 40,
    Blue: 30,
    Yellow: 50,
    Pink: 80,
    Purple: 90,
    Orange: 120,
};

// ฟังก์ชันเริ่มต้น สร้างช่องกรอกเมนูใน HTML
function initMenu() {
    const menuContainer = document.getElementById("menu");
    if (!menuContainer) {
        console.error("Menu container not found");
        return;
    }
    for (const [menuItem, price] of Object.entries(menuPrices)) {
        menuContainer.innerHTML += `
        <div class="row">
          <label>${menuItem} Set (${price} THB/set):</label>
          <input type="number" id="${menuItem}" value="0" min="0">
        </div>
      `;
    }
}

// ฟังก์ชันคำนวณราคาสินค้าทั้งหมด
function calculateSubtotal() {
    let total = 0;
    let bundleDiscount = 0;

    for (const [menuItem, price] of Object.entries(menuPrices)) {
        const inputElement = document.getElementById(menuItem);
        if (!inputElement) {
            console.warn(`Input element for ${menuItem} not found`);
            continue;
        }
        const quantity = parseInt(inputElement.value) || 0;
        total += price * quantity;

        // ตรวจสอบส่วนลดแบบคู่
        if (["Orange", "Pink", "Green"].includes(menuItem)) {
            const bundles = Math.floor(quantity / 2); // คู่ที่ครบ
            bundleDiscount += bundles * price * 0.05; // ลด 5% ต่อคู่
        }
    }

    return { total, bundleDiscount };
}

// ฟังก์ชันหลักคำนวณราคาสุทธิ
function calculateTotal() {
    const { total, bundleDiscount } = calculateSubtotal();
    const memberCardElement = document.getElementById("memberCard");
    const hasMemberCard = memberCardElement ? memberCardElement.checked : false;

    // คำนวณราคาสุทธิ
    let finalTotal = total - bundleDiscount;
    if (hasMemberCard) {
        finalTotal -= finalTotal * 0.1; // ลดเพิ่ม 10% หากมีบัตรสมาชิก
    }

    // แสดงผลราคาสุทธิ
    displayResult(finalTotal);
}

// ฟังก์ชันแสดงผลราคาสุทธิใน DOM
function displayResult(finalTotal) {
    const resultElement = document.getElementById("result");
    if (!resultElement) {
        console.error("Result element not found");
        return;
    }
    resultElement.innerText = `Total Price: ${finalTotal.toFixed(2)} THB`;
}

// เริ่มต้นโปรแกรม
initMenu();
const calculateButton = document.getElementById("calculateButton");
if (calculateButton) {
    calculateButton.addEventListener("click", calculateTotal);
} else {
    console.error("Calculate button not found");
}

module.exports = { initMenu, calculateSubtotal, calculateTotal };
