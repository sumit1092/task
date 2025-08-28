# 📌 FFC Portal (React + Vite)

This project is a **Task Management Portal** built with **React.js (Vite)**.  
It provides authentication, task management, filtering, pagination, and global state handling using **Redux Toolkit**.  
The portal is designed to be **mobile-friendly** and follows the specifications given in the assignment.

---

## 🚀 Tech Stack

- **React.js (Vite)** – Fast development build tool
- **Redux Toolkit** – Global state management
- **React Router DOM** – Navigation & routing
- **Axios** – API calls
- **Mantine UI** – UI components & styling
- **Mantine Notifications** – Toaster (success/error messages)
- **Mantine DatePicker** – For due date selection
- **React Icons** – Icons in Navbar & Menu
- **Environment Variables** – API base URL handling

---


---

## ✅ Features Implemented

### 🔐 Authentication
- Login with **Mobile Number + Password**
- Mobile number **validated to accept only digits**
- Prevents access to tasks without authentication
- **Signout functionality**

### 📊 Dashboard
- Navbar at top
- Sidebar Menu with:
  - Dashboard
  - My Team
  - My Task ✅ (working)
  - Billing
  - Settings

### 📝 My Task
- Task listing with:
  - Filter
  - Search
  - Sorting
  - Pagination

### ➕ Add Task (Modal)
- Modal with:
  - Title (Alphabetical only, Regex validation)
  - Description
  - Due Date (must be greater than current date)
  - File Attachment (Base64, max 2MB)
  - Assign Multiple Users
- Modal closes only with `X` or `Cancel` (not on outside click)
- Validation on cursor touch + error messages
- Prevents multiple clicks without loader

### 🌍 Global Features
- **Redux Toolkit** for state
- **Loader** on every API call
- **Global Toaster** for success/error
- **API Error Handling**
- **Lazy Loading** for performance
- **Responsive & Mobile Friendly**
- **Environment Variables** for API Base URL

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/task-portal.git
cd task-portal

2. Install Dependencies
npm install

3. Environment Setup

Create a .env file at root:

VITE_API_BASE_URL=https://api.example.com

4. Run the App
npm run dev


App will run at: http://localhost:5173
