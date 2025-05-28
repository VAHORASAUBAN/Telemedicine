# Telemedicine

MediQly is a smart healthcare solution offering health tracking via Google Fit, video consultations with doctors, AI-powered diagnosis using LLaMA 4, custom diet planning, health report analysis, Ayushman card integration, health video feeds, emergency hospital services, multilingual support, and real-time chat — all in one app.

# MediQly

**MediQly** is a comprehensive telemedicine and health management application built to empower users with modern digital healthcare services. It integrates various healthcare features including health tracking, online doctor consultations, AI-based diagnosis, diet planning, emergency assistance, and much more.

---

## 🚀 Features

### 📊 Health Tracker
- Integrates with **Google Fit API**.
- Automatically tracks and displays user’s health data including steps, heart rate, and activity levels.
- Enables users to monitor their fitness goals effectively.

### 🩺 Consult Doctor
- Online video conferencing-based **doctor consultation**.
- Secure and seamless virtual interaction between patients and healthcare providers.

### 💬 Real-time Chat
- Built-in **real-time chat** functionality with doctors.
- Chat before or after a consultation for follow-up questions.

### 🥗 Diet Plans
- Users can create **custom diet plans**.
- Built-in **calorie calculator** to track nutritional intake.

### 🤖 AI Doctor
- Integrated **LLaMA 4 model** for AI-powered health consultation.
- Users can chat with an AI Doctor to get preliminary health advice.

### 📁 Report Section
- Upload health reports directly from the app.
- Get **smart AI-driven suggestions** based on the uploaded reports.

### 🪪 Ayushman Integration
- Users can link their **Ayushman Bharat Health Account (ABHA) cards**.
- Enables access to government healthcare benefits within the app.

### 📹 Health Feed
- Uses **YouTube API** to curate and display health-related videos.
- Personalized health video recommendations based on interests.

### 🚨 Emergency Section
- Quickly find **nearest hospitals** using location services.
- One-tap access to **call emergency services** (ambulance, fire, police).

### 🌐 Multilingual Support
- The platform supports **multiple languages** to make healthcare accessible to everyone.
- Users can choose their preferred language for the interface and content.

---

## 🛠️ Technologies Used

- **MongoDB** – NoSQL database for storing user data, reports, and health records  
- **Express.js** – Backend framework to handle API routes and server logic  
- **React.js** – Frontend library to build responsive and dynamic UI  
- **Node.js** – Server environment for backend services  
- **Google Fit API** – To fetch real-time health and fitness data  
- **LLaMA 4 Model** – For AI doctor and smart suggestions  
- **YouTube API** – For health-related video content  
- **Geolocation API** – To locate nearby hospitals in emergencies  
- **Socket.io / Firebase** – For real-time chat and communication  
---

## 📱 Screenshots

*(Include relevant screenshots here if available)*

---

## 📦 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/its-ayanshaikh/Telemedicine.git
   cd Telemedicine

2. **Install dependencies:**

   - Backend:
     ```bash
     cd server
     npm install
     ```

   - Frontend:
     ```bash
     cd client
     npm install
     ```

3. **Set up environment variables:**

   - You will find `.env.example` files in both `frontend` and `backend` directories.
   - Rename them to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open the `.env` files and replace placeholders with your own API keys and secrets:
     - **MongoDB URI** (for database connection)
     - **Google Fit API Key** (for health tracking)
     - **YouTube API Key** (for video feed)
     - **LLaMA 4 / AI Model API Key** (for AI doctor and suggestions)

4. **Run the application locally:**

   - Start the server:
     ```bash
     cd client
     npm run dev
     ```

   - The app will be running at:
     - Frontend: `http://localhost:8080`(or whichever port is defined in your `.env`)
---

## 📱 Screenshots

*(Add screenshots here showing the dashboard, doctor consultation, AI chat, report upload, etc.)*

---

## 🙌 Contributors

- **Ayan Shaikh** – [GitHub](https://github.com/its-ayanshaikh)
- **Sauban Vahora** - [Github](https://github.com/vahorasauban)

