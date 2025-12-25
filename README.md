# 🛒 VibeCart — Full-Stack E‑Commerce Cart System

<div align="center">

![VibeCart Banner](https://img.shields.io/badge/VibeCart-E--Commerce-blueviolet?style=for-the-badge&logo=shopping-cart)

**A modern, production-ready full-stack shopping cart system**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

[Features](#-features) • [Quick Start](#-quick-start) • [API Docs](#-api-reference) • [Screenshots](#-screenshots)

</div>

---

## 🌟 Overview

VibeCart is a complete e-commerce cart solution demonstrating modern full-stack development practices. Built with **React**, **Node.js**, and **SQLite**, it showcases clean architecture, RESTful API design, persistent storage, and seamless UX patterns used in production applications.

### Why VibeCart?

- ✅ **Production-Ready** — Battle-tested patterns and error handling
- ✅ **Persistent Storage** — SQLite database for cart data
- ✅ **Modern Stack** — React 18, Vite, Express, Tailwind CSS
- ✅ **External API Integration** — Fake Store API support
- ✅ **Responsive Design** — Mobile-first approach
- ✅ **Developer Experience** — Hot reload, clean code structure

---

## ✨ Features

### 🔧 Backend Capabilities

```
🔹 RESTful API endpoints for cart operations
🔹 SQLite persistence across server restarts
🔹 Fake Store API integration for products
🔹 Environment-based configuration
🔹 Comprehensive error handling
🔹 Checkout receipt generation
```

### 🎨 Frontend Highlights

```
🔸 Clean, minimalist UI with Tailwind CSS
🔸 Shopping cart drawer with smooth animations
🔸 Optimistic UI updates for instant feedback
🔸 Skeleton loaders & toast notifications
🔸 Keyboard accessible components
🔸 Checkout flow with receipt modal
🔸 Fully responsive across devices
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm installed
- Git for cloning the repository

### Installation

```bash
# Clone the repository
git clone https://github.com/vendotha/mock-ecom-cart.git
cd vibe-cart

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application

**Terminal 1 — Backend Server**
```bash
cd backend
npm run dev
# Server runs on http://localhost:4000
```

**Terminal 2 — Frontend Dev Server**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

### Environment Configuration

Create `.env` in the backend directory:

```env
PORT=4000
USE_SQLITE=true
USE_FAKE_STORE=false
```

| Variable | Description | Default |
|----------|-------------|---------|
| `USE_SQLITE` | Enable persistent cart storage | `true` |
| `USE_FAKE_STORE` | Fetch products from external API | `false` |

---

## 📂 Project Structure

```
vibe-cart/
├── 📁 backend/
│   ├── 📁 src/
│   │   ├── routes/         # API route handlers
│   │   ├── db/             # Database setup & queries
│   │   └── index.js        # Express app entry
│   ├── products.json       # Mock product data
│   ├── .env.example        # Environment template
│   └── package.json
│
└── 📁 frontend/
    ├── 📁 src/
    │   ├── components/     # React components
    │   ├── hooks/          # Custom React hooks
    │   ├── api/            # API client functions
    │   ├── utils/          # Helper utilities
    │   ├── App.jsx         # Main app component
    │   └── main.jsx        # React entry point
    ├── index.html
    ├── tailwind.config.js
    └── package.json
```

---

## 🔌 API Reference

### Base URL
```
http://localhost:4000/api
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/products` | Fetch all products | — |
| `GET` | `/cart` | Get cart items & total | — |
| `POST` | `/cart` | Add item to cart | `{ productId, quantity }` |
| `POST` | `/cart/update` | Update item quantity | `{ id, quantity }` |
| `DELETE` | `/cart/:id` | Remove cart item | — |
| `POST` | `/checkout` | Complete checkout | `{ name, email }` |

### Example Request

```javascript
// Add product to cart
fetch('http://localhost:4000/api/cart', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    productId: 1, 
    quantity: 2 
  })
})
```

### Example Response

```json
{
  "success": true,
  "cart": [
    {
      "id": 1,
      "title": "Product Name",
      "price": 29.99,
      "quantity": 2,
      "image": "https://..."
    }
  ],
  "total": 59.98
}
```

---

## 📸 Screenshots

<div align="center">

### 🛍️ Product Grid
![Product Grid](https://github.com/vendotha/VibeCart/blob/images/Screenshot%202025-11-07%20at%2012.28.38.png)

### 🛒 Cart Drawer
![Cart Drawer](https://github.com/vendotha/VibeCart/blob/images/Screenshot%202025-11-07%20at%2012.29.09.png)

### 💳 Checkout Flow
![Checkout](https://github.com/vendotha/VibeCart/blob/images/Screenshot%202025-11-07%20at%2012.29.33.png)

### 🧾 Receipt Modal
![Receipt](https://github.com/vendotha/VibeCart/blob/images/Screenshot%202025-11-07%20at%2012.29.46.png)

</div>

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite3
- **API Integration:** Fake Store API

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Fetch API
- **State Management:** React Hooks

---

## 🎯 Key Learnings

This project demonstrates:

- **RESTful API Design** — Proper endpoint structure and HTTP methods
- **Database Persistence** — SQLite integration for data storage
- **State Management** — React hooks for cart state
- **Optimistic UI** — Instant feedback before server confirmation
- **Error Handling** — Graceful degradation and user feedback
- **Responsive Design** — Mobile-first CSS approach
- **External APIs** — Third-party service integration

---

## 🚦 Development Roadmap

- [ ] User authentication system
- [ ] Payment gateway integration (Stripe)
- [ ] Product search & filters
- [ ] Order history tracking
- [ ] Admin dashboard
- [ ] Wishlist functionality
- [ ] Product reviews & ratings

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` file for details.

---

## 👤 Author

**Bhuvan Vendotha**

- GitHub: [@vendotha](https://github.com/vendotha)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ and ☕

</div>
