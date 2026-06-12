# Event Recommendations Dashboard

A modern full-stack web application that processes historical event data (attendance, categories, dates, times) and displays data-driven optimization recommendations in a sleek, responsive minimalist black-and-white dashboard. Built using the MERN stack (MongoDB, Express, React, Node.js).

---

## 🚀 Getting Started

Follow these instructions to set up the project and run the backend server and React client locally.

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)
- **MongoDB** (A live local instance at `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI)
  *Note: If MongoDB is offline, the backend will gracefully run in demo mode using in-memory mock data.*

---

## 🛠️ Installation & Setup

### 1. Clone/Navigate to the workspace
Make sure you are in the project root directory.

### 2. Backend Server Setup
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Environment Variables:
   Create a `.env` file in the `server` directory (a template has already been created for you). If omitted, the server defaults to connecting to a local MongoDB instance.
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/event-recommendation
   ```
4. **Seed the Database**:
   Seed MongoDB with the 18 dummy event records (with categories, dates, and times):
   ```bash
   npm run seed
   ```
5. Start the Server:
   ```bash
   npm run dev
   ```

### 2. Frontend Client Setup
1. Navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` to view the dashboard!
