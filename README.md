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

---

### 🏬 Product Categories
- Shop (All Products)
- Men
- Women
- Kids

---

### 🖼️ Product Details Page
- Click any product to view:
  - Product image
  - Price & description
  - Category
- Displays **related products** below, fetched from the backend

---

### 🛒 Cart System
- Add products to cart
- Remove products
- Update product quantity
- Auto-calculated **total price**

---

### 🧑‍💼 Admin Dashboard
- Separate admin interface
- Admin can:
  - Add new clothing products
  - Upload product images
  - Delete products
- Admin routes protected with JWT

---

## 📁 Project Structure

The project is divided into **three main parts**:

- `frontend` → User-facing e-commerce store  
- `admin` → Admin dashboard for product management  
- `backend` → REST API & database logic  

```text
E-commerce-Site
│
├── admin                     # Admin Dashboard (React + Vite)
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── AddProduct
│   │   │   ├── ListProduct
│   │   │   ├── Navbar
│   │   │   └── Sidebar
│   │   ├── config
│   │   │   └── api.js
│   │   ├── pages
│   │   │   └── Admin
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend                   # Backend (Node + Express + MongoDB)
│   ├── src
│   │   ├── config
│   │   │   └── db.js
│   │   ├── controllers
│   │   │   ├── authController.js
│   │   │   ├── cartController.js
│   │   │   └── productController.js
│   │   ├── middleware
│   │   │   ├── fetchUser.js
│   │   │   └── upload.js
│   │   ├── models
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   ├── routes
│   │   │   ├── authRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   └── productRoutes.js
│   │   ├── utils
│   │   │   ├── asyncHandler.js
│   │   │   └── formatProduct.js
│   │   └── server.js
│   ├── seed
│   │   ├── data.js
│   │   └── seed.js
│   ├── upload
│   │   └── images
│   └── package.json
│
├── frontend                  # User-facing Store (React + Vite)
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   │   └── ShopContext.jsx
│   │   ├── config
│   │   │   └── api.js
│   │   ├── pages
│   │   │   ├── Cart.jsx
│   │   │   ├── LoginSignup.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Shop.jsx
│   │   │   └── ShopCategory.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md


## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/khadhijasalam/E--commerce.git
cd E-commerce-Site
###2️⃣ Backend Setup
```bash

cd backend
npm install
npm run dev
###Create a .env file in the backend directory:

```env

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
###3️⃣ Frontend Setup
```bash
Copy code
cd frontend
npm install
npm run dev
###4️⃣ Admin Setup
```bash

cd admin
npm install
npm run dev
🔒 Security
JWT authentication

Protected API routes

Role-based admin access

📌 Future Enhancements
Payment gateway integration

Order history

Wishlist feature

Product reviews & ratings

Cloudinary image hosting
