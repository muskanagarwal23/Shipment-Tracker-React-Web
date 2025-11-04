# 📦 Shipment Delivery Tracker

##Deployment Link :- https://shipment-tracker-react-web-c39v.vercel.app/

A feature-rich Shipment Delivery Web Application that allows users to create, track, and manage deliveries in real-time. Built with **React**, **Firebase Authentication**, **Razorpay for payments**, and **Leaflet with OpenStreetMap** for live tracking.

## ✨ Features

- User registration & login (Firebase Auth)
- Create shipment with sender, receiver, and package details
- Real-time status updates (Processing → In Transit → Delivered)
- Razorpay payment integration
- Live tracking map using Leaflet and OpenStreetMap
- Beautiful UI with Tailwind CSS and Bootstrap
- Dynamic progress bar and tracking timeline

---

## 🔧 Technologies Used

- **Frontend**: React, React Router, Bootstrap, Tailwind CSS
- **Backend**: Firebase (Auth + Firestore/Realtime DB)
- **Payments**: Razorpay
- **Map & Location**: Leaflet + OpenStreetMap

---

## 🚀 Project Setup

### 1. 📁 Clone the Repository

```bash
git clone https://github.com/your-username/shipment-tracker-app.git
cd shipment-tracker-app
```

### 2. 📦 Install Dependencies
```bash
 npm install
 ```

 ### 3. 🔐 Firebase Setup
🔸 Go to Firebase Console
Create a new project

Navigate to Authentication → Enable Email/Password

Navigate to Firestore or Realtime Database and create a database

Go to Project Settings → Web App → Get your config

🔸 Add Firebase Config
Create a .env file at the root:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. 💳 Razorpay Setup
🔸 Go to Razorpay Dashboard
- Create an account and generate API Keys
- Copy your Key ID and Key Secret

### 5. 🗺️ Leaflet Setup
```bash
npm install leaflet react-leaflet
```

# How It Works
User signs up or logs in

Fills a 3-step shipment form:

Sender/Receiver details

Package dimensions and weight

Payment via Razorpay

Shipment is created in Firebase

Tracking page displays:

Status badge (Processing → In Transit → Delivered)

Live Map with location marker (Leaflet)

Timeline history

Quick shipment details
