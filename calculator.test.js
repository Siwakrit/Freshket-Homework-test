const { initMenu, calculateSubtotal, calculateTotal } = require('./app');

// Mock HTML Elements for testing
document.body.innerHTML = `
  <div id="menu"></div>
  <input type="checkbox" id="memberCard">
  <button id="calculateButton">Calculate Total</button>
  <div class="result" id="result"></div>
`;

beforeEach(() => {
  initMenu();
});

const setMenuQuantities = (quantities) => {
  Object.entries(quantities).forEach(([menuItem, quantity]) => {
    const inputElement = document.getElementById(menuItem);
    if (inputElement) {
      inputElement.value = quantity;
    } else {
      console.warn(`Input element for ${menuItem} not found`);
    }
  });
};

const parseResultValue = () => {
  const resultElement = document.getElementById("result");
  if (!resultElement) {
    throw new Error('Result element not found');
  }
  const resultText = resultElement.innerText;
  const resultMatch = resultText.match(/\d+(\.\d+)?/);
  if (!resultMatch) {
    throw new Error('Invalid result text');
  }
  return parseFloat(resultMatch[0]);
};

describe("calculateSubtotal", () => {

  it("calculates bundle discount for Orange, Pink, Green correctly", () => {
    setMenuQuantities({
      Green: 3,
      Pink: 4,
      Orange: 2,
    });

    const { total, bundleDiscount } = calculateSubtotal();
    const expectedTotal = (3 * 40) + (4 * 80) + (2 * 120);
    const expectedDiscount = (1 * 40 * 0.05) + (2 * 80 * 0.05) + (1 * 120 * 0.05);

    expect(total).toBe(expectedTotal);
    expect(bundleDiscount).toBe(expectedDiscount);
  });
});

describe("calculateTotal", () => {
  it("applies 10% discount if member card is checked", () => {
    setMenuQuantities({
      Red: 1,
      Blue: 1,
    });
    const memberCardElement = document.getElementById("memberCard");
    if (memberCardElement) {
      memberCardElement.checked = true;
    } else {
      console.error("Member card element not found");
      return;
    }

    calculateTotal();

    const expectedTotal = (1 * 50 + 1 * 30) * 0.9;
    expect(parseResultValue()).toBe(expectedTotal);
  });

  it("calculates total correctly without member card", () => {
    setMenuQuantities({
      Yellow: 2,
      Purple: 1,
    });
    const memberCardElement = document.getElementById("memberCard");
    if (memberCardElement) {
      memberCardElement.checked = false;
    } else {
      console.error("Member card element not found");
      return;
    }

    calculateTotal();

    const expectedTotal = (2 * 50) + (1 * 90);
    expect(parseResultValue()).toBe(expectedTotal);
  });
  
});

