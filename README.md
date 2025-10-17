# 🎉 Tech Summit 2025 - Event Registration System

> A full-stack event management platform with multi-page website, intelligent registration system, and real-time data management.

🔗 Live Demo (Frontend): https://niranjana-github.github.io/event-registration-system/

🔗 Backend API: https://event-registration-system-avho.onrender.com/


## 📋 Problem Statement

Educational institutions and tech organizations hosting conferences face challenges with:
- **Manual Registration**: Time-consuming paper-based processes prone to errors
- **Poor Information Access**: No centralized platform for event details, speakers, and schedules
- **Data Management**: Spreadsheets lack real-time validation and duplicate prevention
- **User Experience**: Attendees expect modern, mobile-friendly interfaces

**Solution:** A comprehensive web platform providing seamless event registration, complete event information, real-time statistics, and persistent data storage with an intuitive user interface.

---

## 🛠️ Tech Stack

### **Frontend**
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with animations, gradients, and responsive design
- **JavaScript (ES6+)** - Client-side logic, form validation, and API integration
- **Fetch API** - Asynchronous HTTP requests

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **File System (fs)** - JSON-based data persistence
- **CORS** - Cross-origin resource sharing

### **Key Features**
- RESTful API design
- Real-time form validation
- Duplicate email prevention
- Responsive design (mobile-first)
- Auto-incrementing registration numbers
- Statistics dashboard

---

## 🚀 Steps to Run the Project

### **Prerequisites**
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Git

### **Installation**

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/tech-summit-2025.git
cd tech-summit-2025

# 2. Install dependencies
npm install

# 3. Start the server
npm start

# 4. Open browser
# Navigate to http://localhost:3000
```

### **Testing**

```bash
# Test API health
curl http://localhost:3000/health

# Test registration
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# View all registrations
curl http://localhost:3000/registrations
```

---

## 📁 Project Structure

```
tech-summit-2025/
├── server.js              # Express server with API routes
├── package.json          # Dependencies and scripts
├── registrations.json    # JSON database (auto-created)
├── public/
│   └── index.html       # Frontend (HTML + CSS + JS)
└── README.md            # Documentation
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Serve main website |
| `POST` | `/register` | Submit new registration |
| `GET` | `/registrations` | Get all registrations |
| `GET` | `/registrations/count` | Get total count |
| `DELETE` | `/registrations/:id` | Delete registration |
| `GET` | `/health` | Server health check |

### **Example API Response**

```json
{
  "success": true,
  "message": "Registration successful!",
  "data": {
    "id": 1697536800000,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+911234567890",
    "organization": "BTECH CSE",
    "role": "student",
    "registrationNumber": 1,
    "timestamp": "2025-10-17T10:00:00.000Z"
  }
}
```

---

## ✨ Features

### **Multi-Page Website**
- **Home**: Event overview with key details (date, time, venue, attendees)
- **About**: Event purpose, target audience, and highlights
- **Speakers**: Speaker profiles with session information
- **Schedule**: Day-by-day event timeline
- **Register**: Comprehensive registration form with validation
- **View Registrations**: Public dashboard with statistics

### **Smart Registration**
- Real-time validation with visual feedback
- Email format verification
- Duplicate email prevention
- Required field enforcement
- Loading states and success messages

### **Data Management**
- JSON file-based persistent storage
- Automatic ID generation
- Auto-incrementing registration numbers
- ISO timestamp tracking
- Data normalization (email lowercase, trimmed fields)

### **User Experience**
- Smooth animations and transitions
- Mobile-responsive design
- Professional gradient UI
- Hover effects and interactivity
- Instant feedback on all actions

---

## 🧪 Testing Checklist

- [x] All navigation links work
- [x] Form validation (empty fields, invalid email, duplicates)
- [x] Registration submission and success message
- [x] Data persistence in JSON file
- [x] Console logging of registrations
- [x] Statistics dashboard updates
- [x] Responsive design on mobile/tablet/desktop
- [x] API endpoints return correct responses
- [x] Browser compatibility (Chrome, Firefox, Safari, Edge)

---

## 🚀 Deployment

**Render:**
1. Push code to GitHub
2. Connect repository on render.com
3. Set build command: `npm install`
4. Set start command: `npm start`



## 🔒 Security

- Input validation and sanitization
- Email format verification
- Duplicate prevention
- Error handling without exposing internals
- CORS configuration
- Safe file system operations

---

## 📈 Future Enhancements

- Admin authentication (JWT)
- Database integration (MongoDB)
- Email confirmation system
- QR code ticket generation
- Payment integration
- Real-time notifications
- Advanced analytics

---



**⭐ Built with Node.js, Express, and modern web technologies**
