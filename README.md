![image](https://github.com/user-attachments/assets/c9a1b21f-5fa4-467f-ae20-f87f7c65c6fd)


Start
  ↓
Initialize Menu (initMenu)
  - สร้าง HTML input สำหรับเมนูอาหาร
  ↓
User Inputs Quantities
  - ผู้ใช้กรอกจำนวนเซ็ตที่ต้องการในแต่ละเมนู
  ↓
Click "Calculate" Button
  ↓
Calculate Subtotal (calculateSubtotal)
  - Loop ผ่านเมนู
  - คำนวณราคาของแต่ละเมนู (price * quantity)
  - คำนวณส่วนลดคู่ (เฉพาะ Orange, Pink, Green)
  ↓
Apply Discounts
  - ตรวจสอบว่ามีบัตรสมาชิกหรือไม่
  - หากมีบัตรสมาชิก ลดเพิ่ม 10%
  ↓
Display Total (displayResult)
  - แสดงผลลัพธ์ราคาสุทธิในหน้าเว็บ
  ↓
End
