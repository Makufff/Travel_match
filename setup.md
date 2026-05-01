  ---
  วิธีรัน

  1. Frontend

  # ติดตั้ง dependencies
  npm install

  # รัน dev server
  npm run dev

  Frontend จะรันที่ http://localhost:5173

  ---
  2. Backend (FastAPI)

  cd backend

  # สร้าง virtual environment
  python -m venv venv
  source venv/bin/activate   # Linux/Mac

  # ติดตั้ง dependencies
  pip install -r requirements.txt

  # seed ข้อมูลตัวอย่าง (ถ้ายังไม่มี)
  python seed_data.py

  # รัน server
  uvicorn main:app --reload --port 8000

  Backend จะรันที่ http://localhost:8000

  ---
  3. ตั้งค่า Environment

  สร้างไฟล์ .env จาก .env.example:

  cp .env.example .env

  ไฟล์ .env มีแค่ตัวเดียว:
  VITE_API_URL=http://localhost:8000

  ---
  สรุปลำดับการรัน

  1. รัน Backend ก่อน (uvicorn main:app --reload --port 8000)
  2. รัน Frontend (npm run dev)
  3. เปิด http://localhost:5173

  ▎ มี folder server/ อีกอันด้วย ถ้าต้องการดูว่าใช้อันไหนแจ้งได้เลย
