# 📦 Order Management System

A Full Stack Order Management System built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**. This project demonstrates REST API development, database design, automated cron scheduling, order status tracking, scheduler logs, and a responsive React dashboard.

---

# 🚀 Features

## Backend

- RESTful Order APIs
- Create New Order
- Get All Orders
- Get Single Order
- Filter Orders by Status
- Search Orders by Order ID or Customer Name
- Pagination Support
- Order Status History
- Scheduler Execution Logs
- Secret Header Protected Scheduler API
- Automated Order Status Updates using Cron Job
- Environment Variable Support
- Clean MVC Folder Structure

---

## Frontend

- Responsive Dashboard
- Dashboard Statistics
- Create Order Form
- Orders Table
- Status Filter
- Search by Order ID / Customer Name
- Pagination
- Loading State
- Error Handling
- Empty State
- Auto Refresh Orders
- Scheduler Logs Dashboard
- View Single Order Details
- Order History Timeline

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Node Cron
- dotenv
- cors

---

# 📁 Folder Structure

```
Order-Management-System
│
├── client
│   ├── src
│   │
│   ├── components
│   ├── pages
│   ├── layouts
│   ├── services
│   ├── hooks
│   ├── utils
│   ├── App.jsx
│   └── main.jsx
│
├── server
│
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── scheduler
│   ├── utils
│   ├── app.js
│   └── server.js
│
└── README.md
```

---

# 📚 Database Design

This project uses **MongoDB** because it is flexible, scalable, and works well with dynamic JSON data.

Three collections are used.

---

## Orders Collection

Stores all order information.

Example Fields

```
Order ID
Customer Name
Phone Number
Product Name
Amount
Payment Status
Order Status
Created Time
Updated Time
Status Updated Time
```

---

## Order History Collection

Stores every status transition.

Example

```
PLACED
↓

PROCESSING
↓

READY_TO_SHIP
```

Each history document stores

- Order Reference
- Previous Status
- New Status
- Changed By
- Changed Time

This makes the complete order lifecycle traceable.

---

## Scheduler Logs Collection

Every scheduler execution creates one log document.

Stores

- Run Time
- Orders Checked
- Orders Updated
- Execution Status

Useful for monitoring background jobs.

---

# 🔄 Order Status Flow

The scheduler automatically updates order statuses.

```
PLACED
      │
      │ 10 Minutes
      ▼

PROCESSING
      │
      │ 20 Minutes
      ▼

READY_TO_SHIP
```

Every transition is stored in the Order History collection.

---

# ⏰ Scheduler

This project uses **node-cron** for automatic background processing.

Scheduler runs every **5 minutes**.

Responsibilities

- Fetch Orders
- Check Order Age
- Update Status
- Store History
- Save Scheduler Logs

The Scheduler API is protected using a secret key.

Example Header

```
x-secret-key : YOUR_SECRET_KEY
```

---

# 🔐 Environment Variables

Server

```
PORT=5000

MONGO_URI=your_mongodb_connection

SECRET_KEY=your_secret_key
```

Client

```
VITE_API_URL=http://localhost:5000/api
```

---

# 📡 API Endpoints

## Orders

### Create Order

```
POST /api/orders
```

---

### Get All Orders

Supports

- Status Filter
- Search
- Pagination

```
GET /api/orders
```

Example

```
GET /api/orders?status=PROCESSING

GET /api/orders?search=Amaan

GET /api/orders?page=2
```

---

### Get Single Order

```
GET /api/orders/:id
```

---

### Get Order History

```
GET /api/orders/:id/history
```

---

## Scheduler

Run Scheduler

```
POST /api/scheduler/run
```

Protected using

```
x-secret-key
```

---

Scheduler Logs

```
GET /api/scheduler/logs
```

---

# 🖥 Frontend Dashboard

Dashboard contains

- Statistics Cards
- Order Creation Form
- Status Filter
- Search Bar
- Pagination
- Orders Table
- Scheduler Logs
- Order Details Page
- Order History

---

# ⚡ Loading & Error Handling

Implemented

- Loading UI
- Empty State
- Error Messages
- API Error Handling

---

# ▶️ Run Locally

## Clone Repository

```
git clone https://github.com/your-username/Order-Management-System.git
```

---

## Backend

```
cd server

npm install

npm run dev
```

---

## Frontend

```
cd client

npm install

npm run dev
```

---

# 📮 Postman Collection

The repository includes Postman requests for testing all APIs.

Includes

- Create Order
- Get Orders
- Get Single Order
- Order History
- Scheduler
- Scheduler Logs

---

# 💡 System Design Decisions

### Why MongoDB?

- Flexible schema
- Easy scalability
- Fast development
- Perfect for nested order history

---

### How Duplicate Orders are Prevented?

Each order receives a unique generated Order ID.

---

### How Status History is Stored?

Every scheduler status update creates a new Order History document instead of overwriting previous data.

---

### How Scheduler Logs are Stored?

Each scheduler execution inserts one Scheduler Log document containing execution statistics.

---

### How Race Conditions are Handled?

Status updates are performed in a controlled scheduler execution, and history is recorded immediately after each successful update to maintain consistency.

---

### Scalability

The project follows MVC Architecture which makes it easy to

- Add Authentication
- Add Admin Panel
- Deploy on Cloud
- Add Payment Gateway
- Add Notifications
- Handle Large Number of Orders

---

# 🌟 Bonus Features

✅ Scheduler Logs Dashboard

✅ Order History

✅ Search Orders

✅ Pagination

✅ Single Order Details Page

✅ Responsive UI

✅ Auto Refresh Dashboard

---

# 👨‍💻 Author

**Amaan Khan**

Full Stack Developer

Built as a Full Stack Developer Assignment using React, Express, MongoDB, and Node Cron.
