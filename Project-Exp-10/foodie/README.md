# 🍕 Foodie — MERN Food Delivery App

A full-stack food delivery web application built with **MongoDB, Express, React, and Node.js**.

---

## 📁 Project Structure

```
foodie/
├── server/          # Express + MongoDB backend
│   ├── models/      # Mongoose schemas (User, Restaurant, MenuItem, Order)
│   ├── routes/      # API routes (auth, restaurants, menu, orders, cart)
│   ├── middleware/  # JWT auth middleware
│   ├── index.js     # Entry point
│   ├── seed.js      # Database seeder
│   └── .env.example
│
└── client/          # React frontend
    ├── public/
    └── src/
        ├── components/
        │   ├── common/      # Navbar, Footer
        │   └── restaurant/  # RestaurantCard, MenuItemCard
        ├── context/         # AuthContext, CartContext
        ├── pages/           # Home, Restaurants, RestaurantDetail, Cart,
        │                    # Checkout, Orders, OrderDetail, Login, Register, Profile
        └── App.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- MongoDB (local or MongoDB Atlas)

---

### 1. Clone & Install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

### 2. Configure Environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/foodie
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

> For MongoDB Atlas, replace MONGO_URI with your Atlas connection string.

---

### 3. Seed the Database

```bash
cd server
node seed.js
```

This creates:
- 5 restaurants with full menus
- Admin account: `admin@foodie.com` / `admin123`
- Demo user: `john@example.com` / `password123`

---

### 4. Run the App

**Terminal 1 — Backend:**
```bash
cd server
npm run dev     # with nodemon (auto-reload)
# or
npm start       # production
```

**Terminal 2 — Frontend:**
```bash
cd client
npm start
```

App runs at: **http://localhost:3000**  
API runs at: **http://localhost:5000**

---

## 🔑 Features

### Customer
- 🏠 Beautiful home page with hero, search, categories
- 🍽️ Browse and filter restaurants by cuisine
- 📋 View menus with veg/non-veg indicators
- 🛒 Add to cart (with cross-restaurant conflict detection)
- 💳 Checkout with address + payment method
- 📦 Order tracking with visual progress steps
- 👤 Profile management with saved address

### Admin
- Full CRUD for restaurants and menu items via API
- View and update all orders
- Role-based access control

---

## 🛠️ API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/profile` | Get profile (auth) |
| PUT | `/api/auth/profile` | Update profile (auth) |

### Restaurants
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/restaurants` | List all (supports `?search=` `?cuisine=` `?featured=true`) |
| GET | `/api/restaurants/:id` | Single restaurant |
| POST | `/api/restaurants` | Create (admin) |
| PUT | `/api/restaurants/:id` | Update (admin) |
| DELETE | `/api/restaurants/:id` | Delete (admin) |

### Menu
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/menu/restaurant/:id` | Menu items for restaurant |
| POST | `/api/menu` | Create item (admin) |
| PUT | `/api/menu/:id` | Update item (admin) |
| DELETE | `/api/menu/:id` | Delete item (admin) |

### Cart (authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart |
| POST | `/api/cart/add` | Add item |
| PUT | `/api/cart/update` | Update quantity |
| DELETE | `/api/cart/remove/:id` | Remove item |
| DELETE | `/api/cart/clear` | Clear cart |

### Orders (authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders/my` | My orders |
| POST | `/api/orders` | Place order |
| GET | `/api/orders/:id` | Order details |
| PUT | `/api/orders/:id/cancel` | Cancel order |
| GET | `/api/orders` | All orders (admin) |
| PUT | `/api/orders/:id/status` | Update status (admin) |

---

## 🎨 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, React Router v6, Axios |
| Styling | Pure CSS with CSS variables |
| State | React Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT + bcryptjs |
| Notifications | react-hot-toast |

---

## 📦 Build for Production

```bash
# Build React app
cd client
npm run build

# Serve static files from Express (optional)
# Move build/ into server/public and add:
# app.use(express.static('public'))
# app.get('*', (req, res) => res.sendFile('public/index.html'))
```

---

## 🤝 Contributing

PRs welcome! Feel free to open issues for bugs or feature requests.

---

*Built with ❤️ using the MERN stack*
