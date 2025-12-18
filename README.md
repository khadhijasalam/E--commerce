# 🛒 MERN Stack E-Commerce Application

A full-stack **E-Commerce web application** built using the **MERN stack** with a **React (Vite) frontend**, **JWT authentication**, a **dedicated admin dashboard**, and **complete cart functionality**.

---

## 🚀 Live Demo

- **Frontend:** https://e-commerce-six-tan.vercel.app/
- **Admin Dashboard:** https://e-commerce-admin-sandy-theta.vercel.app/admin/listproduct

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- React Router
- Context API
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (Image Uploads)

### Deployment
- Frontend & Admin: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

## ✨ Features

### 🔐 Authentication
- JWT-based authentication
- Secure login & signup
- Protected routes for users and admin

### 🏬 Product Categories
- Shop (All Products)
- Men
- Women
- Kids

### 🖼️ Product Details Page
- View product image, price, description, and category
- Displays **related products** fetched from the backend

### 🛒 Cart System
- Add, remove, and update cart items
- Auto-calculated total price

### 🧑‍💼 Admin Dashboard
- Add new clothing products
- Upload product images
- Delete products
- JWT-protected admin routes

---

## 📁 Project Structure

```text
E-commerce-Site
│
├── admin
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── config
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── server.js
│   ├── seed
│   ├── upload
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── config
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---
## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/khadhijasalam/E--commerce.git
cd E-commerce-Site
```
---
# 🛒 Project Setup Guide

## 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```
Create a .env file inside the backend directory:

env
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

3️⃣ Frontend Setup
```bash

cd frontend
npm install
npm run dev
```
4️⃣ Admin Setup

```bash
cd admin
npm install
npm run dev
```
## 🔒 Security

- JWT Authentication  
- Protected API Routes  
- Role-based Admin Access  

---

## 📌 Future Enhancements

- Payment Gateway Integration  
- Order History  
- Wishlist Feature  
- Product Reviews & Ratings  
- Cloudinary Image Hosting  
