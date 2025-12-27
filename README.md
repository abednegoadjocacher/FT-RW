# ICGC-PHT Church Admin System

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Stack](https://img.shields.io/badge/stack-Next.js_14-black)
![Database](https://img.shields.io/badge/database-MySQL-orange)

A comprehensive internal dashboard designed for the **International Central Gospel Church (PHT)** to manage church assets, track financial records, and maintain a digital member directory.

## 🚀 Features

### 🔐 Authentication & Security
- **Compulsory Login:** Secure guard preventing unauthorized access to internal records.
- **Session Management:** Uses `sessionStorage` for strict security (auto-logout on tab close).
- **Role-Based Access:** currently configured for Admin level access.

### 📦 Asset Management
- **Inventory Tracking:** Full CRUD (Create, Read, Update, Delete) for church assets.
- **Categorization:** Dynamic filtering by category (Electronics, Furniture, Instruments, etc.).
- **Valuation Analytics:** Real-time calculation of total asset value and depreciation status.
- **Excel Export:** One-click export of inventory data to `.xlsx` for offline reporting.

### 💰 Financial Records
- **Transaction Logging:** Track Tithes, Offerings, and Operational Expenses.
- **Member Directory:** Manage member details with automatic timestamping.
- **Financial Overview:** Dashboard cards showing Total Income, Expenses, and Net Balance.
- **Concurrent Loading:** Optimized data fetching using `Promise.all` for speed.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (React)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts (for dashboard analytics)
- **Database:** MySQL
- **Data Export:** XLSX (SheetJS)

---

## ⚙️ Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites
- Node.js (v18 or higher)
- MySQL Server (installed and running)
- Git

### 2. Installation

```bash
# Clone the repository
git clone ![https://github.com/abednegoadjocacher/FT-RW](https://github.com/abednegoadjocacher/FT-RW)

# Navigate to project folder
cd icgc

# Install dependencies
npm install