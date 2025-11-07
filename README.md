# 🛒 Mock E-Com Cart — Full-Stack Assignment (Vibe Commerce)

A full-stack shopping cart application built as part of the Vibe Commerce internship assignment. The project demonstrates API design, React UI development, state management, database persistence, and integration with an external API.

---

## ✅ Features Overview

### **Backend (Node.js + Express)**

* `GET /api/products` – serves **mock items** or **Fake Store API** items (bonus).
* `GET /api/cart` – retrieves cart items and total price.
* `POST /api/cart` – adds an item to the cart.
* `POST /api/cart/update` – updates quantity (optional improvement).
* `DELETE /api/cart/:id` – removes an item.
* `POST /api/checkout` – generates a **mock receipt** (ID, total, timestamp).
* **BONUS ✅**: SQLite persistence – cart is saved for a mock user.
* **BONUS ✅**: Fake Store API integration – toggle external products.

---

### **Frontend (React + Vite + Tailwind CSS)**

* Clean, responsive, minimal UI.
* Subtle light theme for professional look.
* **Product Grid** with Add to Cart.
* **Cart Drawer** featuring quantity stepper, remove option, and total.
* **Optimistic UI** for cart updates.
* **Skeleton loaders** and **toast notifications**.
* **Checkout Form** (name & email).
* **Receipt Modal** showing order details.
* Good accessibility (Escape to close, focus states).
* Fully responsive.

---

## ✅ Bonus Features Implemented

### ✅ **1. SQLite Cart Persistence**

Enable using `.env`:

```
USE_SQLITE=true
```

* Persists cart across backend restarts.
* Schema and DB helper included.

### ✅ **2. Fake Store API Integration**

Enable using `.env`:

```
USE_FAKE_STORE=true
```

* Fetches products from `https://fakestoreapi.com`.
* Auto-maps to `{ id, name, price }`.

### ✅ **3. Error Handling**

* Backend returns structured error responses.
* Frontend displays toast messages and graceful UI fallbacks.

---

## 📁 Project Structure

```
mock-ecom-cart/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── db/
│   │   ├── index.js
│   │   └── ...
│   ├── products.json
│   ├── .env.example
│   ├── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── api/
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── tailwind.config.js
    └── package.json
```

---

# ⚙️ Setup & Installation

## ✅ Backend Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Create `.env`

```
PORT=4000
USE_SQLITE=true
USE_FAKE_STORE=false
```

### 3. Install SQLite if using persistence

```bash
npm install sqlite3
```

Or faster alternative:

```bash
npm install better-sqlite3
```

### 4. Start server

```bash
npm run start
```

---

## ✅ Frontend Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Add optional `.env`

```
VITE_API_URL=http://localhost:4000/api
```

### 3. Start dev server

```bash
npm run dev
```

Open: `http://localhost:5173`

---

# 🧪 API Endpoints Summary

| Method | Endpoint           | Description                       |
| ------ | ------------------ | --------------------------------- |
| GET    | `/api/products`    | Fetch mock or Fake Store products |
| GET    | `/api/cart`        | Get cart + total                  |
| POST   | `/api/cart`        | Add item                          |
| POST   | `/api/cart/update` | Update quantity                   |
| DELETE | `/api/cart/:id`    | Remove item                       |
| POST   | `/api/checkout`    | Generate receipt                  |

---

# 📸 Screenshots

* Product Grid
  
![Screenshot 1](https://github.com/vendotha/mock-ecom-cart/blob/main/Screenshot%202025-11-07%20at%2012.28.38.png)

* Cart Drawer

![Screenshot 2](https://github.com/vendotha/mock-ecom-cart/blob/main/Screenshot%202025-11-07%20at%2012.29.09.png)

*  Checkout

![Screenshot 3](https://github.com/vendotha/mock-ecom-cart/blob/main/Screenshot%202025-11-07%20at%2012.29.33.png)

* Recipt Model

![Screenshot 4](https://github.com/vendotha/mock-ecom-cart/blob/main/Screenshot%202025-11-07%20at%2012.29.46.png)

---

# 🎥 Demo Video

Add unlisted video link:

```
https://your-demo-link-here
```

Recommended flow: product → cart → update → remove → checkout → receipt.

---

# ✅ Final Notes

* Full implementation of required features.
* Both bonus tasks completed.
* Clean and responsive UI.
* API + UI paths thoroughly tested.

This submission demonstrates full-stack development, modern UI design, state management, external API integration, and database persistence.
