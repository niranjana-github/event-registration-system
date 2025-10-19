🚀 BuildCon 2025 – Event Registration System

A full-stack event registration platform featuring secure authentication, real-time data management, and a responsive user interface.

🔗 Deployment Link: https://event-registration-dusky.vercel.app/

📋 Problem Statement

Educational institutions and organizations hosting events often face challenges with manual registration systems:

🔹 Time-consuming and error-prone data collection
🔹 No authentication or data protection
🔹 Poor user experience and form validation
🔹 Lack of centralized data and analytics
🔹 Limited access to event details and updates

💡 Our Solution

BuildCon 2025 solves these issues through:

✅ Secure authentication using Supabase
✅ Smart registration forms with validation
✅ Centralized database for all records
✅ Real-time analytics and dashboards
✅ Responsive multi-page design with event details

🛠️ Tech Stack
Frontend

🔸 HTML5, CSS3, JavaScript (ES6+) – Structure, styling, and interactivity
🔸 Supabase JS Client – Authentication and real-time database connection

Backend

🔸 Node.js, Express.js – Server logic and API endpoints
🔸 Supabase (PostgreSQL) – Cloud database for secure data storage

Deployment

🔸 Vercel – Frontend hosting
🔸 Supabase Cloud – Database and authentication
🔸 GitHub – Version control

🎯 Key Features
Authentication

🟢 Secure user login/signup
🟢 Email and password-based access
🟢 Session handling with Supabase

Event Management

🟢 Multi-page event website
🟢 Registration form with validation
🟢 Dashboard with total registration statistics

Data Handling

🟢 Real-time Supabase database
🟢 Unique email validation
🟢 Persistent data storage

User Experience

🟢 Responsive design for all devices
🟢 Smooth transitions and animations
🟢 Modern UI using gradients and flexbox

🚀 Steps to Run the Project
Prerequisites

➤ Node.js (v14 or higher)
➤ npm or yarn
➤ Git
➤ Supabase account (for database setup)

1️⃣ Clone the Repository
git clone https://github.com/yourusername/buildcon-2025.git
cd buildcon-2025

2️⃣ Install Dependencies
npm install

3️⃣ Configure Supabase

Supabase credentials are directly added in the HTML files (auth.html and index.html) using JavaScript:

const SUPABASE_URL = 'https://ykmzlirhxtvzxxqxrwpb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrbXpsaXJoeHR2enh4cXhyd3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2ODk3MDIsImV4cCI6MjA3NjI2NTcwMn0.-r9_D2czMy3fN8hPiiB6zJxZIzmucjl0ICCBYFA8-us';


4️⃣ Create the Database Table

Run this SQL in Supabase SQL Editor:

CREATE TABLE registrations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  register_no TEXT,
  phone TEXT,
  organization TEXT,
  role TEXT,
  experience TEXT,
  interests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

5️⃣ Start the Server
npm start

Then visit: http://localhost:3000

🌐 Live Deployment

You can directly access the deployed version here:
👉 https://event-registration-dusky.vercel.app/

Steps:

🔹 Sign up or log in

🔹 Explore event details

🔹 Register for BuildCon 2025

🔹 View registration statistics

📸 Screenshots

📍 Authentication Page
<img width="956" height="482" alt="image" src="https://github.com/user-attachments/assets/0252befa-8cf5-4990-9352-def8d733914c" />


📍 Home Page
<img width="944" height="494" alt="image" src="https://github.com/user-attachments/assets/2bcda0d8-2135-4688-9644-5f9b8293d3f6" />


📍 Registration Form
<img width="938" height="486" alt="image" src="https://github.com/user-attachments/assets/f77f5d1d-e894-47ab-88c5-48df5eb8fd71" />

📍 Registration Dashboard
<img width="937" height="486" alt="image" src="https://github.com/user-attachments/assets/faebbdfe-c849-4516-a474-f6984f6f8dd4" />



🔒 Security Highlights

✅ Passwords encrypted via Supabase Auth

✅ JWT-based authentication

✅ Input validation and sanitization

✅ CORS protection

✅ HTTPS deployment via Vercel
