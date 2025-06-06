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

# 1. Clone the repository and navigate into the project directory
git clone https://github.com/codesbyvikas/TripTactix.git
cd TripTactix

# 2. Set up the Backend
cd backend
npm install

# Create a .env file inside the backend/ folder with your MongoDB connection string
# Replace 'your_mongodb_connection_string' with your actual MongoDB Atlas URI
# You can get one from MongoDB Atlas by creating a free cluster
# Once the .env file is created, start the backend server
echo "PORT=5000" > .env
echo "MONGO_URI=your_mongodb_connection_string" >> .env
npm start

# 3. Set up the Frontend (open a new terminal window for this)
# Navigate back to the root 'TripTactix' directory, then into 'frontend'
cd ../frontend
npm install
npm run dev


