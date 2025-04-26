# 🏨 Moon Hotel DApp

ระบบจองห้องพักอัจฉริยะผ่าน Blockchain  
พัฒนาโดยใช้ **HTML**, **JavaScript (Ethers.js)**, และเชื่อมต่อกับ **Smart Contract บน Ethereum Testnet**.

---

## 🚀 คุณสมบัติ (Features)

- ✅ เชื่อมต่อกับกระเป๋าเงิน MetaMask
- ✅ เลือกชั้น (A / B / C) และเลือกห้องพัก
- ✅ ระบบตรวจสอบห้องว่างแบบ Real-time
- ✅ ชำระเงินด้วย Ether เพื่อจองห้อง
- ✅ ล้างข้อมูลการจองทั้งหมด (เฉพาะเจ้าของระบบ)
- ✅ พื้นหลังหน้าแรกเปลี่ยนภาพอัตโนมัติทุก 5 วินาที

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- Frontend: **HTML5, CSS3, JavaScript (Vanilla)**
- Blockchain Interaction: **Ethers.js**
- Smart Contract: **Solidity (Deploy บน Testnet)**
- Wallet: **MetaMask**

---

## 📂 โครงสร้างโปรเจกต์ (Project Structure)




---

## 🔗 วิธีใช้งาน (Getting Started)

1. ติดตั้ง MetaMask ใน Browser (ถ้ายังไม่มี) [🔗 ติดตั้งที่นี่](https://metamask.io/)
2. เปลี่ยน MetaMask ไปยัง Testnet ที่ Smart Contract ถูก Deploy ไว้ (เช่น Sepolia หรือ Mumbai)
3. เปิด `index.html` ใน Browser
4. คลิกปุ่ม **🌟 เข้าสู่ระบบจองห้องพัก**
5. กด **Connect Wallet** เชื่อม MetaMask
6. เลือก **ชั้น** ➔ เลือก **ห้อง** ➔ กดจอง
7. ยืนยันการทำธุรกรรมใน MetaMask
8. เสร็จสิ้น! ระบบจะอัปเดตสถานะห้องแบบอัตโนมัติ

---

## 🧩 Smart Contract

- **Address:** `0xeA0543f735D5fF0c261cE8Fc7203dE4BaE9E6427`
- **Functions หลัก:**
  - `bookRoom(roomId)` - จองห้อง
  - `clearBookings()` - ล้างข้อมูลห้องจอง
  - `getBookedRooms()` - ดึงข้อมูลห้องที่ถูกจองแล้ว
  - `getRoomPrice(roomId)` - ดูราคาห้องตามชั้น

---

## 🖼️ รูปตัวอย่าง (Screenshots)

![image](https://github.com/user-attachments/assets/edc875cf-50fd-4298-aca3-204359a2b6b6)
![image](https://github.com/user-attachments/assets/a54e42aa-6cb3-4461-95b7-f1ffc35c553d)

---

## ✨ ผู้พัฒนา (Developer)

- Natdanai Soicom
- ![image](https://github.com/user-attachments/assets/6b472846-4872-42a0-81f5-221650823810)


---

## 📜 License

This project is for educational purposes.  
Feel free to use, customize, and improve it! 🚀


