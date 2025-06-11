# Hamperly – Subscription Hamper Ordering System

Hamperly is a full-stack web application that allows users to register, browse available hampers, place orders, and track their purchase history. It also includes a secure admin dashboard to manage users, orders, and inventory. The app is designed to streamline the ordering of curated subscription boxes.

---

## Live Links

- **Frontend**: https://hamperly-frontend.onrender.com  
- **Backend API**: https://hamperly-backend.onrender.com  
- **Mail Service**: https://hamperly-mail-service.onrender.com  
  > _Note: The mail service is functional but not fully integrated into the main user flow yet._

---

## Features

### User Functionality
- Register and login securely
- Browse available hampers with descriptions and pricing
- Select quantity and place an order
- View past orders with order date and status
- Token-based authentication for protected routes

### Admin Functionality
- Login with a secure admin account
- View all registered users
- View all orders, sorted into active and completed
- Toggle order status between `active` and `completed`
- View current inventory (all hampers and stock levels)
- Role-based access control with `adminOnly` middleware

---

## 🧑Tech Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Render
- **Mail Service**: Nodemailer (separate service)

---

## Setup Instructions (Local Development)

### 1. Clone the Repos

```bash
git clone https://github.com/Coderaccangus/Hamperly

```

### 2. Backend Setup

```
cd hamperly-backend
npm install
cp .env.example .env  # fill in MONGODB_URI and JWT_SECRET
npm run seed:admin      
npm run seed:users
npm run seed:hampers
npm run start

Optional: user npm run clear:users & clear:hampers to clear all users/hampers
```
### 3. Backend Setup
```
cd hamperly-frontend
npm install
npm run dev
```
### Testing

You can use tools like Insomnia or Postman to test backend endpoints like:

    POST /api/users/register

    POST /api/users/login

    GET /api/orders/my-orders (requires JWT)

    POST /api/orders (requires JWT)

Admin routes:

    GET /api/admin/users

    GET /api/admin/orders

    PUT /api/orders/:id – Update status

### Mail Service

The standalone mail service is hosted here:
👉 https://hamperly-mail-service.onrender.com

While not fully integrated into the production app, it's working independently and ready for use when needed (e.g., for order confirmations or welcome emails).

Mail Service routes:

    POST  https://hamperly-mail-service.onrender.com/send
    
    {
  "to": "test@example.com",
  "subject": "Hamperly Render Email Test",
  "text": "This is a test email sent from Render!"
    }


### Future Improvements

    Full integration of the mail service for notifications

    Stripe or PayPal checkout integration

    User profile editing

    Advanced filtering and analytics for admins

    Mobile responsiveness and UI polish

### Admin Login Details (example seeded user)
```
Email: admin1@example.com
Password: Admin1234
```

