# 🚗 Ridezy – Full-Stack Car Rental Web App

A premium car rental platform built with the MERN stack. This app allows users to browse, book, and manage car rentals while enabling owners to list and manage their vehicles.

🔗 [Live Client](https://ridezy-f8c9c.web.app)  
🔗 [Live API](https://ridezy-server-side.vercel.app)

---

## 📁 Project Structure

```
ridezy/
 ├ client/  → React frontend (React router + Firebase)
 └ server/  → Express backend (MongoDB + Firebase Admin SDK)
```

---

## ✨ Key Features

### Client

- 🔐 Firebase Auth (Google & Email/Password)
- 🚘 Car listings with search + filters
- 🗕 Booking system with history
- 🌟 Animated UI with Framer Motion

### Server

- 🌐 RESTful API with CRUD (Cars, Users, Bookings)
- 🔐 JWT & Firebase Admin SDK for secure access
- 📀 MongoDB Atlas integration

---

## 🚀 Tech Stack

**Frontend:**  
React, Tailwind CSS, DaisyUI, Firebase, Framer Motion, React Router, Axios, TanStack Query

**Backend:**  
Node.js, Express, MongoDB, Firebase Admin SDK, dotenv

---

## 🛠️ Run Locally

```bash
# Clone the full project
git clone https://github.com/rafirono13/ridezy.git
cd ridezy

# Run client
cd client
npm install
npm run dev

# Run server (in another terminal tab)
cd ../server
npm install
npm run dev
```

---

## 📝 License

This project is open source and free to use for learning and experimentation purposes.
