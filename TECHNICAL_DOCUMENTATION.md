# Technical Documentation

## Backend Architecture

### 1. Models (Database Schema)

Models in this project are implemented using Mongoose, which is an Object Data Modeling (ODM) library for MongoDB. Each model represents a collection in the MongoDB database and defines the structure of the documents within that collection.

#### User Model (`/server/models/User.js`)
```javascript
const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }
});
```
- **Purpose**: Manages user authentication and authorization
- **Implementation Details**:
  - Uses Mongoose schema for data validation
  - Implements unique email constraint
  - Role-based access control (user/admin)
  - Password is hashed before storage
  - JWT token generation for authentication

#### Product Model (`/server/models/Product.js`)
```javascript
const ProductSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  category: String,
  brand: String,
  price: Number,
  salePrice: Number,
  totalStock: Number
}, { timestamps: true });
```
- **Purpose**: Manages the product catalog
- **Implementation Details**:
  - Includes image URL for product display
  - Supports categorization and branding
  - Price management with regular and sale prices
  - Stock tracking functionality
  - Automatic timestamp tracking

#### Order Model (`/server/models/Order.js`)
```javascript
const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [{
    productId: String,
    title: String,
    image: String,
    price: String,
    quantity: Number
  }],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String
});
```
- **Purpose**: Handles order processing and tracking
- **Implementation Details**:
  - Links orders to users and carts
  - Stores complete order details
  - Tracks order and payment status
  - Supports multiple payment methods
  - Includes shipping address information

### 2. Controllers (Business Logic)

Controllers handle the business logic of the application. They process incoming requests, interact with models, and send responses back to the client.

#### Auth Controllers (`/server/controllers/auth/`)
- **Purpose**: Handles user authentication and authorization
- **Implementation Details**:
  - User registration with validation
  - Login with JWT token generation
  - Password hashing using bcrypt
  - Session management
  - Profile updates

#### Admin Controllers (`/server/controllers/admin/`)
- **Purpose**: Manages administrative functions
- **Implementation Details**:
  - Product management (CRUD operations)
  - User management and role assignment
  - Order processing and status updates
  - Sales analytics and reporting

#### Shop Controllers (`/server/controllers/shop/`)
- **Purpose**: Handles e-commerce operations
- **Implementation Details**:
  - Product listing and search
  - Cart management
  - Order processing
  - Address management

### 3. Routes (API Endpoints)

Routes define the API endpoints and map them to controller functions. They handle HTTP requests and responses.

#### Auth Routes (`/server/routes/auth/`)
```javascript
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, authController.updateProfile);
```
- **Purpose**: Handles authentication-related endpoints
- **Implementation Details**:
  - Protected routes using middleware
  - Input validation
  - Error handling
  - Response formatting

#### Admin Routes (`/server/routes/admin/`)
```javascript
router.get('/products', adminController.getProducts);
router.post('/products', adminController.createProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);
```
- **Purpose**: Provides administrative API endpoints
- **Implementation Details**:
  - Role-based access control
  - Input validation
  - File upload handling
  - Data sanitization

#### Shop Routes (`/server/routes/shop/`)
```javascript
router.get('/products', shopController.getProducts);
router.get('/products/:id', shopController.getProduct);
router.post('/cart', shopController.addToCart);
router.get('/cart', shopController.getCart);
router.post('/orders', shopController.createOrder);
```
- **Purpose**: Handles e-commerce operations
- **Implementation Details**:
  - Product listing and filtering
  - Cart management
  - Order processing
  - Address handling

## Frontend Architecture

### 1. Components (`/client/src/components/`)
- **Purpose**: Reusable UI elements
- **Implementation Details**:
  - Functional components using React Hooks
  - Props for data passing
  - Styled using Tailwind CSS
  - Responsive design

### 2. Pages (`/client/src/pages/`)
- **Purpose**: Main application views
- **Implementation Details**:
  - Route-based components
  - Data fetching using custom hooks
  - State management using Context API
  - Form handling and validation

### 3. Store (`/client/src/store/`)
- **Purpose**: State management
- **Implementation Details**:
  - Context API for global state
  - Reducers for state updates
  - Actions for state modifications
  - Persistence using localStorage

### 4. Hooks (`/client/src/hooks/`)
- **Purpose**: Custom React hooks
- **Implementation Details**:
  - Data fetching hooks
  - Form handling hooks
  - Authentication hooks
  - Cart management hooks

## Security Implementation

### Authentication
- JWT-based authentication
- Token storage in HTTP-only cookies
- Password hashing using bcrypt
- Session management
- Role-based access control

### Data Validation
- Input sanitization
- Schema validation using Mongoose
- Request body validation
- Error handling middleware

### API Security
- CORS configuration
- Rate limiting
- Request size limits
- SQL injection prevention
- XSS protection

## Performance Optimizations

### Backend
- Database indexing
- Query optimization
- Caching strategies
- Connection pooling
- Error handling

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Bundle size optimization
- Caching strategies

## Error Handling

### Backend
- Global error middleware
- Custom error classes
- Error logging
- Error response formatting
- Validation error handling

### Frontend
- Error boundaries
- Toast notifications
- Loading states
- Fallback UI
- Error logging

## Testing Strategy

### Backend
- Unit tests for controllers
- Integration tests for routes
- Database tests
- Authentication tests
- Error handling tests

### Frontend
- Component tests
- Integration tests
- E2E tests
- Performance tests
- Accessibility tests 