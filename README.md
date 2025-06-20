# Stannum - An E-commerce Platform

A full-stack e-commerce application built with React, Node.js, and MongoDB. This project implements a modern e-commerce platform with user authentication, product management, shopping cart functionality, and order processing.

## Project Structure

The project is organized into two main directories:

### 1. Client (Frontend)
Located in the `client` directory, this is a React-based single-page application.

#### Key Directories:
- `src/components/` - Reusable UI components
- `src/pages/` - Main application pages
- `src/store/` - State management (Redux/Context)
- `src/hooks/` - Custom React hooks
- `src/config/` - Configuration files
- `src/lib/` - Utility functions and libraries
- `src/assets/` - Static assets (images, fonts, etc.)

#### Technologies Used:
- React.js
- Vite (Build tool)
- Tailwind CSS (Styling)
- Redux/Context API (State Management)
- Axios (HTTP Client)

### 2. Server (Backend)
Located in the `server` directory, this is a Node.js Express server.

#### Database Models (`/server/models/`)

1. **User Model** (`User.js`)
   - Implements user authentication and profile management
   - Fields: userName, email, password, role
   - Role-based access control (user/admin)
   - Email uniqueness validation

2. **Product Model** (`Product.js`)
   - Manages product catalog
   - Fields: image, title, description, category, brand, price, salePrice, totalStock
   - Timestamps for creation and updates
   - Flexible schema for various product types

3. **Order Model** (`Order.js`)
   - Handles order processing and tracking
   - Fields: userId, cartId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus
   - Detailed order tracking with status updates
   - Payment integration fields (paymentId, payerId)

4. **Cart Model** (`Cart.js`)
   - Manages shopping cart functionality
   - Tracks user's cart items and quantities
   - Handles cart operations (add, remove, update)

5. **Address Model** (`Address.js`)
   - Stores user shipping addresses
   - Multiple addresses per user support
   - Detailed address information

#### Controllers (`/server/controllers/`)

1. **Auth Controllers** (`/auth/`)
   - User registration and login
   - Password hashing and JWT token generation
   - Session management

2. **Admin Controllers** (`/admin/`)
   - Product CRUD operations
   - User management
   - Order processing
   - Analytics and reporting

3. **Shop Controllers** (`/shop/`)
   - Product listing and search
   - Cart management
   - Order processing
   - Address management

#### Routes (`/server/routes/`)

1. **Auth Routes** (`/auth/`)
   - POST /register - User registration
   - POST /login - User authentication
   - GET /profile - User profile
   - PUT /profile - Profile updates

2. **Admin Routes** (`/admin/`)
   - CRUD operations for products
   - User management endpoints
   - Order management
   - Analytics endpoints

3. **Shop Routes** (`/shop/`)
   - GET /products - Product listing
   - GET /products/:id - Product details
   - POST /cart - Add to cart
   - GET /cart - View cart
   - POST /orders - Place order
   - GET /orders - View orders

## Features

### User Management
- User registration and authentication using JWT
- Profile management with role-based access
- Secure password hashing
- Session management

### Product Management
- Product catalog with images
- Category and brand organization
- Price management with sale prices
- Stock tracking

### Shopping Experience
- Shopping cart with persistent storage
- Multiple shipping addresses
- Order tracking and status updates
- Payment integration

### Admin Features
- Complete product management
- User administration
- Order processing and tracking
- Sales analytics

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies for both client and server
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables
- Create `.env` files in both client and server directories
- Configure necessary environment variables (database URL, JWT secret, etc.)

4. Start the development servers
```bash
# Start the server
cd server
npm run dev

# Start the client
cd ../client
npm run dev
```

## API Documentation

The server exposes RESTful APIs for:
- Authentication (`/api/auth`)
- Products (`/api/products`)
- Orders (`/api/orders`)
- Users (`/api/users`)

Detailed API documentation can be found in the server's documentation.

## Security Features

- JWT-based authentication
- Password hashing
- Input validation
- CORS configuration
- Rate limiting
- Secure session management

## Performance Optimizations

- Image optimization
- Code splitting
- Lazy loading
- Caching strategies
- Database indexing

## Testing

The project includes:
- Unit tests for components
- Integration tests for API endpoints
- End-to-end tests for critical user flows

## Deployment

The application can be deployed using:
- Frontend: Vercel, Netlify, or any static hosting
- Backend: Heroku, AWS, or any Node.js hosting platform
- Database: MongoDB Atlas or self-hosted MongoDB

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
