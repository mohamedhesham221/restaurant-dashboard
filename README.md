<p align="center">
  <img src="./src/assets/logo.png" alt="Meat Meals Restaurant" width="50" height="50"/>
</p>

# Butcha Restaurant Dashboard

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)

A comprehensive restaurant management system designed specifically for meat-focused dining establishments with real-time dashboard, order management, and analytics.

## Features

- 🔒 **Secure Authentication** using Firebase Auth with role-based access
- 🔒 **Secure Routes** secure specified routes if visitor did not login
- 🍖 **Meals Management** complete CRUD operations for meat dishes (add, update, delete)
- 📋 **Reservations Management** table booking system with CRUD operations (add, update, delete, view)
- 📊 **Orders Management** comprehensive order handling (create, update, cancel, track status)
- 📈 **Analytics Dashboard** with sales reports and charts using Recharts
- 🔄 **Real-time Updates** with Firestore and TanStack Query
- 📱 **Responsive Design** works perfectly on all devices
- 🏷️ **Meta Tags Control** dynamic website title changes when navigating between pages

## Pages & Components

| Page/Component | Description |
|---------------|-------------|
| **Home Page** | Landing page with restaurant overview and featured meals |
| **About Page** | Restaurant story, mission, and team information |
| **Contact Page** | Contact information, location map, and inquiry form |
| **FAQ Page** | Frequently asked questions and customer support |
| **Menu Page** | Complete meat dishes catalog with categories and pricing |
| **Dashboard** | Admin/staff panel for restaurant management and analytics |
| **Login Page** | Secure authentication for customers and staff |
| **Register Page** | New user registration with email/password validation |
| **Customer Data Form** | Customer profile management and personal information |
| **Reservation Page** | Table booking system with date/time selection |
| **Cart Page** | Order summary, item management, and checkout process |
| **Not Found (404)** | Custom error page for invalid routes |

## Tech Stack

**Frontend:**

- React.js 18+
- Vite (Build tool)
- Material-UI (MUI) v5
- TanStack Query (v4+)
- React Router v6
- React Hook Form
- Zustand (State Management)
- Recharts (Analytics)

**Backend Services:**

- Firebase Authentication
- Firestore Database
- Firebase Storage

**UI & Styling:**

- Material-UI Components
- MUI Icons
- Responsive Grid System

## Screenshots

![Dashboard Screenshot](./src/assets/dashboard-screenshot.png)
![Orders Screenshot](./src/assets/orders-screenshot.png)

## 🚀 Live Preview

Check out the live version here: [Restaurant Dashboard](https://restaurant-dashboard-ten.vercel.app/)

## 📂 Folder Structure

```
restaurant-dashboard/
├── node_modules
├── public
├── src/
│   ├── assets
│   ├── components/
│   │   ├── home
│   │   ├── about
│   │   ├── menu
│   │   ├── faq
│   │   ├── reservation
│   │   ├── dashboard
│   │   ├── login
│   │   ├── contact
│   │   └── customer
│   ├── hooks
│   ├── layouts
│   ├── pages
│   ├── store
│   ├── firebase
│   ├── utils
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── eslint.config.js
├── vite.config.js
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/mohamedhesham221/restaurant-dashboard
cd restaurant-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## 🔥 Firebase Configuration

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the setup wizard
3. Enable these services:

### 2. Authentication Setup

```bash
# Enable Email/Password and Google auth:
1. Go to Authentication → Sign-in method
2. Click "Email/Password" and enable it
4. Save changes
```

### 3. Firestore Database Setup

1. Go to Firestore Database
2. Click "Create Database" → Start in test mode
3. Choose your preferred region
4. Create these collections:
   - `meals`
   - `orders`
   - `reservations`

### Environment Variables

Create `.env` file in project root:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview


## 👨‍💻 Author

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/your-profile/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@gmail.com)

## 📄 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## ⭐ Show your support

Give a ⭐️ if this project helped you!
