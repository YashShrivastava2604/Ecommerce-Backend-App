# 🛍️ Backend Shopping App

A backend-only shopping application built while learning **Node.js** and **Express.js**, focusing on clean architecture using the **MVC (Model-View-Controller)** pattern.

This project serves as a foundational learning experience in building RESTful APIs and structuring server-side code effectively for scalability and clarity.

---

## 📚 Learning Objectives

- Understand core backend concepts using **Node.js** and **Express**
- Practice **CRUD operations** with real-world features
- Apply the **MVC pattern** to separate concerns:
  - **Models** for data schema and logic
  - **Controllers** for handling request/response logic
  - **Routes** for API endpoint definitions

---

## 🔧 Features

### 🔐 Authentication
- **Signup** new users
- **Login** existing users
- (Optional) Middleware-protected routes for secure actions

### 🛒 Shopping Functionality
- **Create products** (title, description, price, etc.)
- **View all products** or filter/search
- **Add products to cart**
- **View cart contents**

---

## 🗂️ Project Structure (MVC)

project/
├── controllers/ # Business logic
├── models/ # Database schemas
├── routes/ # API endpoints
├── middlewares/ # Auth and utilities
├── config/ # Database and environment configs
├── app.js # Entry point
└── README.md

🛠️ Technologies Used:
->Node.js

->Express.js

->MongoDB + Mongoose (for data modeling)

->JWT (for authentication)

->Postman or cURL (for testing endpoints)

## 🚀 How to Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/shopping-backend.git
   cd shopping-backend
Install dependencies

bash->npm install
Create a .env file (if using environment variables)

PORT=3000
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
Start the server

bash
npm start

🧠 What I Learned
Setting up REST APIs using Express

Structuring a project using MVC for clean separation of concerns

User authentication with hashed passwords and JWTs

Basic error handling and request validation

📩 Feedback or Contributions?
This project is a learning exercise, but feedback, suggestions, and pull requests are always welcome to help improve the code and structure!

📌 Future Improvements
Add order placement and payment logic

Integrate with frontend (React/Next.js)
