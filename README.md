# Full-Stack E-Commerce Website

A full-featured, responsive e-commerce application built with the MERN stack (MongoDB, Express/Node.js, React, and JWT). It allows users to browse products, view details, add items to the cart, register/login, and securely place orders.

## Tech Stack

### Frontend
- React (Vite)
- React Router
- TailwindCSS
- Axios (for API calls)
- React Bits & Aceternity (UI animations and enhancements)

### Backend
- Node.js with Express
- MongoDB + Mongoose
- JWT Authentication
- RESTful API

## Features

### Frontend
- Responsive design for mobile and desktop
- Product listing page with thumbnails and prices
- Product details page with full description and images
- Cart page to review and update quantities
- Authentication: Register & Login
- Checkout page with order summary and confirmation
- UI feedback using toasts/animations (React Bits)
- Clean, styled UI using Aceternity components

### Backend
- User registration and login with JWT
- REST API for:
  - Products (GET)
  - Users (POST, GET)
  - Cart (POST, PUT, DELETE)
  - Orders (POST)
- Secure routes with JWT middleware
- Mongoose models for Products, Users, Orders
