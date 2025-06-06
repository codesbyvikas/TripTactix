# 🧳 TripTactix

TripTactix is a AI powered full-stack itinerary planner web application built using the MERN stack. It allows users to generate personalized day-wise travel plans based on their destination, travel dates, interests, and budget. The app offers multiple itinerary options to suit different travel preferences.

---

## 🚀 Features

- 📍 Destination input with validation
- 📅 Select start and end dates using a date picker
- 💸 Budget slider to personalize trip plans
- ❤️ Choose interests like food, culture, nature, or adventure
- 📋 Generates day-wise itineraries
- 🔁 Smooth navigation using React Router and state management
- 🌐 Responsive design suitable for all devices

---

## 🧑‍💻 Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router, Lucide Icons  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (via Mongoose)  
- **Deployment**: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

---

## 📥 How to Clone and Use

Follow these steps to run TripTactix locally on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/triptactix.git
cd triptactix

###2. Set up the Backend
cd backend
npm install

#Create a .env file inside the backend/ folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string

###Start the backend server:
cd frontend
npm install
npm run dev

##📁 Folder Structure
triptactix/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.js
│   └── public/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── server.js
├── .env
└── README.md

