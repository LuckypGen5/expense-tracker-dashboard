# Expense Tracker Dashboard

A beginner-friendly full-stack Expense Tracker Dashboard built with:

- **Frontend:** React + Vite + React Router
- **Backend:** Node.js + Express
- **Database:** MySQL
- **Auth:** JWT + bcryptjs

## Features

- Register / Login
- Add expense
- Edit expense
- Delete expense
- View all expenses
- Dashboard summary cards
- Category breakdown
- Monthly totals
- Protected routes with JWT

## Project Structure

```bash
expense-tracker-dashboard/
├── frontend/
├── backend/
└── database.sql
```

## Quick Start

### 1) Create database
Open MySQL and run the SQL inside `database.sql`.

### 2) Start backend
```bash
cd backend
npm install
npm run dev
```

### 3) Configure backend environment
Create a `.env` file inside `backend/`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=expense_tracker
JWT_SECRET=your_super_secret_key
```

### 4) Start frontend
Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

### 5) Open app
Visit the local URL shown by Vite, usually:
`http://localhost:5173`

## Notes
- Backend default URL: `http://localhost:5000`
- Frontend is already configured to call that backend
- You can improve this by adding filters, export to CSV, dark mode, and charts later

## Best GitHub Tips
Before pushing to GitHub, add:
- screenshots
- a good README
- setup steps
- feature list
- tech stack
- demo video or hosted link
