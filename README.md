# FootStyle E-Commerce Platform

A full-stack e-commerce platform for premium footwear with modern UI, secure authentication, and comprehensive admin dashboard.

---

## 🚀 Features

### User Features

* **Secure Authentication**: Email/Password with OTP verification
* **Social Login**: Google OAuth integration
* **Product Browsing**: Filter, search, and view detailed product pages
* **Shopping Cart**: Add/remove items, update quantities
* **Wishlist**: Save favorite products
* **Order Management**: Place orders, track order status
* **User Profile**: Update personal information
* **Password Recovery**: Secure reset flow with OTP verification

### Admin Features

* **Dashboard**: Overview of store performance
* **Product Management**: CRUD operations for products
* **Order Management**: View and update order statuses
* **User Management**: Activate/deactivate users, view user details
* **Inventory Control**: Manage product stock and variants

### Technical Features

* **Responsive Design**: Mobile-first approach
* **Protected Routes**: Role-based access control
* **Image Upload**: Product image management
* **Payment Integration**: Multiple payment methods
* **Error Handling**: Global error boundary and toast notifications
* **Form Validation**: Client and server-side validation

---

## 🛠 Tech Stack

### Backend

* Node.js with Express.js - Server framework
* MongoDB with Mongoose - Database
* JWT - Authentication tokens
* Passport.js - OAuth strategies
* Multer - File upload handling
* CORS - Cross-origin resource sharing
* dotenv - Environment configuration

### Frontend

* Next.js 14 - React framework with App Router
* TypeScript - Type safety
* Tailwind CSS - Utility-first styling
* React Context - State management
* Axios - HTTP client
* React Hot Toast - Notifications
* React Icons - Icon library

---

## 📁 Project Structure

```
/
├── backend/
│   ├── config/          # Database and passport configuration
│   ├── controllers/     # Business logic handlers
│   ├── middleware/      # Auth, upload, validation middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API route definitions
│   ├── uploads/         # Uploaded product images
│   └── server.js        # Express server entry point

├── frontend/
│   ├── app/             # Next.js app router pages
│   │   ├── about/       # About page
│   │   ├── admin/       # Admin dashboard pages
│   │   ├── auth/        # Authentication pages
│   │   ├── cart/        # Shopping cart
│   │   ├── checkout/    # Checkout process
│   │   ├── orders/      # User orders
│   │   ├── products/    # Product listings
│   │   ├── profile/     # User profile
│   │   └── wishlist/    # Wishlist page
│   ├── components/      # Reusable UI components
│   ├── containers/      # Page-specific containers
│   ├── context/         # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── interfaces/      # TypeScript interfaces
│   ├── services/        # API service calls
│   └── utils/           # Utility functions

├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

---

## ⚙️ Installation

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

---

## 🔧 Environment Variables

### Backend (.env)

```
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/footstyle
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:3000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Frontend (.env)

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint                              | Description                   | Auth Required |
| ------ | ------------------------------------- | ----------------------------- | ------------- |
| POST   | /api/auth/signup/request-otp          | Request OTP for signup        | No            |
| POST   | /api/auth/signup/verify-otp           | Verify OTP and create account | No            |
| POST   | /api/auth/login                       | Login user                    | No            |
| POST   | /api/auth/forgot-password/request-otp | Request password reset OTP    | No            |
| POST   | /api/auth/forgot-password/verify-otp  | Verify reset OTP              | No            |
| POST   | /api/auth/forgot-password/reset       | Reset password                | No            |
| GET    | /api/auth/me                          | Get current user              | Yes           |
| PUT    | /api/auth/me                          | Update user profile           | Yes           |
| GET    | /api/authGoogle                       | Google OAuth                  | No            |

### Products

| Method | Endpoint                 | Description        | Auth Required |
| ------ | ------------------------ | ------------------ | ------------- |
| GET    | /api/products            | Get all products   | No            |
| GET    | /api/products/:id        | Get product by ID  | No            |
| POST   | /api/products            | Create new product | Admin         |
| PUT    | /api/products/:id        | Update product     | Admin         |
| DELETE | /api/products/:id        | Delete product     | Admin         |
| POST   | /api/products/:id/review | Add review         | Yes           |

### Orders

| Method | Endpoint                     | Description            | Auth Required |
| ------ | ---------------------------- | ---------------------- | ------------- |
| GET    | /api/orders                  | Get all orders (admin) | Admin         |
| GET    | /api/orders/user/all         | Get user orders        | Yes           |
| GET    | /api/orders/:orderId         | Get order by ID        | Yes           |
| POST   | /api/orders/create           | Create order           | Yes           |
| PUT    | /api/orders/:orderId/payment | Add payment            | Yes           |
| PUT    | /api/orders/:orderId/status  | Update order status    | Admin         |

### Cart

| Method | Endpoint                  | Description      | Auth Required |
| ------ | ------------------------- | ---------------- | ------------- |
| GET    | /api/cart                 | Get cart items   | Yes           |
| POST   | /api/cart/add             | Add to cart      | Yes           |
| POST   | /api/cart/remove          | Remove from cart | Yes           |
| POST   | /api/cart/update-quantity | Update quantity  | Yes           |
| POST   | /api/cart/clear           | Clear cart       | Yes           |

### Wishlist

| Method | Endpoint                 | Description          | Auth Required |
| ------ | ------------------------ | -------------------- | ------------- |
| GET    | /api/wishlist            | Get wishlist         | Yes           |
| POST   | /api/wishlist            | Add to wishlist      | Yes           |
| DELETE | /api/wishlist/:productId | Remove from wishlist | Yes           |

### Users (Admin)

| Method | Endpoint                     | Description               | Auth Required |
| ------ | ---------------------------- | ------------------------- | ------------- |
| GET    | /api/users                   | Get all users             | Admin         |
| GET    | /api/users/:id               | Get user by ID            | Admin         |
| DELETE | /api/users/:id               | Delete user               | Admin         |
| PATCH  | /api/users/toggle-active/:id | Toggle user active status | Admin         |

---

## 🛣️ Frontend Routes

### Public Routes

* `/` - Home page
* `/about` - About us page
* `/contact` - Contact page
* `/products` - Product listings
* `/login` - User login
* `/signup` - User registration
* `/forgot-password` - Password recovery flow

### Protected Routes (Customer)

* `/profile` - User profile
* `/cart` - Shopping cart
* `/wishlist` - Saved items
* `/orders` - Order history
* `/checkout` - Checkout process

### Admin Routes

* `/admin` - Admin dashboard
* `/admin/products` - Product management
* `/admin/orders` - Order management
* `/admin/customers` - User management

---

## 🔐 Authentication Flow

### User Registration

1. User enters email, password, and personal details
2. OTP is sent to email
3. User verifies OTP
4. Account is created and user is logged in

### Password Reset

1. User requests password reset with email
2. OTP is sent to email
3. User verifies OTP
4. User sets new password

### Social Login

1. User clicks "Login with Google"
2. Redirects to Google OAuth consent screen
3. Returns JWT token on successful authentication

---

## 👨‍💼 Admin Features

### Product Management

* Create, read, update, delete products
* Upload multiple product images
* Set product categories, sizes, prices
* Manage inventory stock

### Order Management

* View all orders with filters
* Update order status
* View order details and customer information
* Process returns and refunds

### User Management

* View all registered users
* Activate/deactivate user accounts
* View user order history
* Manage user roles (admin/customer)

--


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---


## 👤 Author

**Name:** Puvanakopis  
**GitHub:** [@puvanakopis](https://github.com/puvanakopis)  
**LinkedIn:** [Puvanakopis](https://www.linkedin.com/in/puvanakopis/)  
**Email:** puvanakopis@gamil.com
