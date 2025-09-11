# MERN Stack CRM Application

A full-stack Customer Relationship Management (CRM) application built with MongoDB, Express.js, React.js, and Node.js.

## Features

- **Authentication**: User registration and login with JWT tokens
- **Customer Management**: Add, edit, view, and delete customers
- **Lead Management**: Track leads for each customer with status updates
- **Search & Pagination**: Find customers quickly with search and pagination
- **Role-based Access**: Admin and User roles
- **Responsive Design**: Works on desktop and mobile devices

## Database Schema

### Collections

- **users**: `{ id, name, email, passwordHash, role }`
- **customers**: `{ id, name, email, phone, company, ownerId }`
- **leads**: `{ id, customerId, title, description, status, value, createdAt }`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Authenticate and return JWT

### Customers
- GET `/api/customers` - List customers (with pagination + search)
- POST `/api/customers` - Add new customer
- GET `/api/customers/:id` - View customer details
- PUT `/api/customers/:id` - Update customer details
- DELETE `/api/customers/:id` - Delete customer

### Leads
- GET `/api/leads/customer/:customerId` - Get leads for a customer
- POST `/api/leads` - Add new lead
- PUT `/api/leads/:id` - Update lead
- DELETE `/api/leads/:id` - Delete lead

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/crm
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

3. **Start MongoDB**:
   Make sure MongoDB is running on your system.

4. **Run the Application**:
   ```bash
   npm run dev
   ```
   This will start both the backend server (port 5000) and React client (port 5173).

5. **Access the Application**:
   Open your browser to `http://localhost:5173`

## Usage

1. **Register**: Create a new account with your name, email, and password
2. **Login**: Sign in with your credentials
3. **Add Customers**: Create customer records with contact information
4. **Manage Leads**: Add leads for each customer and track their status
5. **Search**: Use the search functionality to find specific customers
6. **Update Status**: Change lead status as they progress through the sales pipeline

## Lead Statuses

- **New**: Newly created lead
- **Contacted**: Customer has been contacted
- **Converted**: Lead has become a sale
- **Lost**: Lead is no longer viable

## Technologies Used

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Styling**: Custom CSS with responsive design

## Project Structure

```
BackEnd
├── models/          # MongoDB models (User, Customer, Lead)
├── routes/          # API routes (auth, customers, leads)
├── middleware/      # Authentication middleware
|   FrontEnd
├── src/              
│   ├── components/  # React components
│   ├── context/     # Auth context
│   └── services/    # API service layer
├── server.js        # Express server setup
└── package.json     # Dependencies and scripts
```
