# 💰 Finance Dashboard UI

A clean and interactive finance dashboard built using React.
This project demonstrates frontend development skills including UI design, state management, and data visualization.

---

## 🚀 Overview

This dashboard allows users to track their financial activity through:

* Summary of balance, income, and expenses
* Visualization of financial trends
* Transaction management
* Role-based UI behavior

The goal of this project is to showcase how a real-world dashboard can be structured and implemented using modern frontend tools.

---

## ✨ Features

### 📊 Dashboard Overview

* Displays Total Balance, Income, and Expenses
* Line chart showing balance trend over time
* Pie chart showing spending breakdown by category

### 📋 Transactions Section

* List of all transactions with:

  * Date
  * Category
  * Amount
  * Type (income/expense)
* Search functionality (by category)
* Filter by category
* Add new transactions (Admin only)

### 👤 Role-Based UI

* Viewer:

  * Can only view data
* Admin:

  * Can add transactions
* Role switching implemented via dropdown

### 💡 Insights

* Highlights highest spending category
* Provides simple financial observation based on data

---

## 🧠 Approach

* Built reusable components for better scalability and maintainability
* Used Zustand for global state management (transactions, role, UI state)
* Implemented controlled components for form handling
* Structured project into pages and components for clarity
* Used mock data initially and enhanced with localStorage for persistence

---

## ⚙️ Tech Stack

* React (Vite)
* Tailwind CSS
* Recharts (for data visualization)
* Zustand (state management)
* localStorage (data persistence)

---

## 💾 Data Persistence

Transactions are stored in the browser using localStorage.
This ensures that added data remains available even after refreshing the page.

---

## 📁 Project Structure

```
src/
 ├── components/
 │    ├── cards/
 │    ├── charts/
 │
 ├── pages/
 │    ├── Dashboard.jsx
 │    ├── Transactions.jsx
 │
 ├── store/
 │    └── useStore.js
 │
 ├── data/
 │    └── mockData.js
```

---

## ⚙️ Setup Instructions

1. Clone the repository:

```bash
git clone <your-repo-link>
cd finance-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

---

## 🌙 Additional Enhancements

* Dark mode support
* Persistent data using localStorage
* Clean and responsive UI design

---

## 📌 Assumptions

* Backend is not implemented; all data is managed on frontend
* Role-based access is simulated for demonstration purposes

---

## 🔮 Future Improvements

* Edit and delete transactions
* Advanced filters (date range, type)
* Backend/API integration
* Authentication system
* Export data (CSV/JSON)

---

## 👨‍💻 Author

Pranab Tiwari
