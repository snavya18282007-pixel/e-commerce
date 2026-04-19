# Project Navi - Mobile-First E-commerce Platform

Production-ready full-stack e-commerce application with clear separation of:
- Frontend (`frontend`) - React + Vite + Tailwind CSS
- Backend (`backend`) - Node.js + Express + MongoDB
- Admin (`/admin`) - AdminJS panel

## Folder Structure

```txt
project_navi/
  frontend/
    src/
      components/
      pages/
      services/
      store/
    index.html
    package.json
    tailwind.config.js
    vite.config.js
  backend/
    src/
      admin/
      config/
      controllers/
      middleware/
      models/
      routes/
      server.js
    package.json
  README.md
```

## Frontend Features

- Minimal monochrome UI with blue accent (`#2563eb`)
- Mobile-first responsive layout
- Sticky navbar (logo, search, category dropdown, cart badge)
- Footer
- Reusable product card
- Loading and error states
- Zustand stores for cart and user state

### Implemented Pages

1. Homepage
   - Hero section
   - Featured categories
   - New Arrivals grid
   - Best Sellers grid

2. Product Listing
   - Filters: category and price range
   - Sorting: price asc/desc, rating
   - Pagination

3. Product Detail
   - Image gallery
   - Product details + rating
   - Quantity selector
   - Add to Cart / Buy Now

4. Cart
   - Item list
   - Quantity controls
   - Remove items
   - Live total calculation

5. Checkout
   - Shipping form
   - Mock payment selection
   - Order summary

6. Order History
   - User order list
   - Status tags (pending/shipped/delivered)

## Backend API

Base URL: `/api`

### Products
- `GET /api/products?page=1&limit=10`
- `GET /api/products/:id`
- `POST /api/products` (admin only)
- `PUT /api/products/:id` (admin only)
- `DELETE /api/products/:id` (admin only)

### Orders
- `POST /api/orders`
- `GET /api/orders` (admin)
- `GET /api/orders/user/:userId`
- `PATCH /api/orders/:id/payment-status` (admin)

### Payments
- `POST /api/payments/webhook` (HMAC-verified webhook)

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

Mock JWT auth with roles:
- `admin`
- `customer`

## Mongoose Schemas

### Product
- `name`
- `price`
- `category`
- `description`
- `fullDescription`
- `images[]`
- `rating`
- `stock`

### Order
- `userId`
- `items[{ productId, quantity }]`
- `totalPrice`
- `status`
- `createdAt`

### User
- `name`
- `email`
- `password` (hashed)
- `role`

### Category
- `name`
- `description`

## Admin Panel (AdminJS)

Access at:
- `http://localhost:5000/admin`

Capabilities:
- Add/edit/delete products
- Manage orders
- Manage categories

## Sample API Responses

### `GET /api/products?page=1&limit=2`
```json
{
  "products": [
    {
      "_id": "6612fdb0a1c9f31d88c17711",
      "name": "Minimal Desk Lamp",
      "price": 49.99,
      "category": "Home",
      "description": "Soft-light lamp for modern workspaces",
      "images": ["https://example.com/lamp.jpg"],
      "rating": 4.5,
      "stock": 33
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 2,
    "total": 42,
    "totalPages": 21
  }
}
```

### `POST /api/orders`
```json
{
  "message": "Order created",
  "order": {
    "_id": "6613a2ccf4d25f3b6fd88c9a",
    "userId": "6612fd48a1c9f31d88c1669b",
    "items": [{ "productId": "6612fdb0a1c9f31d88c17711", "quantity": 2 }],
    "totalPrice": 99.98,
    "status": "pending",
    "createdAt": "2026-04-07T18:20:01.000Z"
  }
}
```

### `POST /api/auth/login`
```json
{
  "message": "Login successful",
  "token": "jwt-token-value",
  "user": {
    "_id": "6612fd48a1c9f31d88c1669b",
    "name": "Demo Customer",
    "email": "customer@example.com",
    "role": "customer"
  }
}
```

## Setup Instructions

## 1) Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with valid values:
- `MONGO_URI` (MongoDB Atlas URI)
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `PAYMENT_WEBHOOK_SECRET`

Run backend:
```bash
npm run dev
```

## 2) Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on `http://localhost:5173` and expects backend on `http://localhost:5000`.

## Realtime + Security

- Realtime order updates are powered by Socket.IO (`socket.io` + `socket.io-client`).
- Backend includes `helmet` for secure headers.
- Global API rate limiting is enabled with `express-rate-limit`.
- Order and payment-status APIs are validated with `zod`.
- Payment webhook endpoint validates `x-webhook-signature` using `PAYMENT_WEBHOOK_SECRET`.

## Deployment

### Frontend -> Vercel
1. Import `frontend` directory as a Vercel project.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set `VITE_API_URL` to backend Render URL.

### Backend -> Render
1. Create Web Service from `backend` directory.
2. Build command: `npm install`
3. Start command: `npm start`
4. Add environment variables from `.env.example`.

### Database -> MongoDB Atlas (Free Tier)
1. Create free cluster.
2. Create database user and IP allowlist.
3. Copy connection string into backend `MONGO_URI`.

## Production Notes

- Use HTTPS in deployed URLs.
- Rotate JWT secrets regularly.
- Restrict CORS to deployed frontend domain.
- Add request rate limiting and validation middleware before go-live.
