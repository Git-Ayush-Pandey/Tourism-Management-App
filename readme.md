# 🏔️ Tourism Management Web App (Jammu, Kashmir & Ladakh)
A full-stack MERN web application for exploring, booking, and managing tourism services across **Jammu, Kashmir, and Ladakh**.  
The platform supports destinations, hotels, travel packages, transport services, and secure admin management.

Live Demo (Frontend): **https://tourism-frontend-d7fk.onrender.com**  
Backend API: **https://tourism-backend-kn35.onrender.com/api**

---

## 🚀 Features

### 🧳 User Features
- Browse destinations (Jammu, Kashmir, Ladakh)
- View hotel listings with rooms & amenities
- Explore travel packages and itineraries
- Transport services and vehicle rentals
- Book hotels, packages & transport
- JWT-based authentication (Login/Register)
- User profile & booking history

### 🛠️ Admin Features
- Admin Login (Role-based access)
- Manage Hotels (Add / Edit / Delete)
- Manage Travel Packages
- Manage Transport Services
- Manage Bookings
- Dashboard for analytics

### ✔ Additional
- Dark/Light Theme using Context API
- Protected Routes
- Reviews & Ratings
- Responsive Modern UI
- Search & Filters

---

## 🛠️ Tech Stack

### **Frontend**
- React.js (Vite)
- Tailwind CSS
- React Router
- Axios
- Context API

### **Backend**
- Node.js + Express
- MongoDB + Mongoose
- Cloudinary (images)
- JWT Authentication
- CORS, Helmet, Rate-Limiter

### **Deployment**
- Render (Frontend + Backend)
- MongoDB Atlas (Database)
- Cloudinary (Media Storage)

---

## 📁 Folder Structure

```
Tourism-Management-App/
 ├── backend/
 │   ├── config/
 │   ├── controllers/
 │   ├── middleware/
 │   ├── models/
 │   ├── routes/
 │   └── server.js
 ├── frontend/
 │   ├── src/
 │   │   ├── components/
 │   │   ├── context/
 │   │   ├── hooks/
 │   │   ├── pages/
 │   │   ├── services/
 │   │   ├── utils/
 │   │   ├── App.jsx
 │   │   └── main.jsx
 │   └── index.html
 └── README.md
```

---

## ⚙️ Environment Variables

### **Backend `.env`**
```
PORT=5000
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
ALLOWED_ORIGINS=https://tourism-frontend.onrender.com
```

### **Frontend `.env`**
```
VITE_API_URL=https://tourism-management-app.onrender.com/api
```

---

## 🔌 API Endpoints Summary

### **Auth**
```
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/profile
```

### **Destinations**
```
GET /api/destinations
GET /api/destinations/:id
```

### **Hotels**
```
GET    /api/hotels
GET    /api/hotels/:id
POST   /api/admin/hotels
PUT    /api/admin/hotels/:id
DELETE /api/admin/hotels/:id
```

### **Packages**
```
GET    /api/packages
GET    /api/packages/:id
POST   /api/admin/packages
PUT    /api/admin/packages/:id
DELETE /api/admin/packages/:id
```

### **Transport Services**
```
GET /api/transport-services
```

### **Bookings**
```
POST /api/bookings
GET  /api/bookings/user
GET  /api/admin/bookings
```

---

## 🧩 Local Installation

### 1️⃣ Clone the repository
```
git clone https://github.com/Git-Ayush-Pandey/Tourism-Management-App.git
cd Tourism-Management-App
```

### 2️⃣ Install backend dependencies
```
cd backend
npm install
```

### 3️⃣ Install frontend dependencies
```
cd ../frontend
npm install
```

### 4️⃣ Start backend
```
npm run dev
```

### 5️⃣ Start frontend
```
npm run dev
```

---

## 🌐 Deployment (Render)

### Backend  
- Type: Web Service  
- Root Directory: `backend`  
- Build: `npm install`  
- Start: `node server.js`  

### Frontend  
- Type: Static Site  
- Root Directory: `frontend`  
- Build: `npm install && npm run build`  
- Publish: `dist`  

---

## 🤝 Contributing
Pull requests are welcome.  
For major changes, open an issue first to discuss your ideas.

---

## 📄 License
This project is licensed under the **MIT License**.

---

## 👨‍💻 Developer
**Ayush Pandey**  
B.Tech CSE, IIT Jammu  
Full-stack Developer & Software Engineer

