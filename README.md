🎉 Event Registration System

A simple Event Registration Web App with both frontend & backend, built as part of SRM ACM SIGCHI tech task.

🔗 Live Demo (Frontend): https://niranjana-github.github.io/event-registration-system/

🔗 Backend API: 

🚀 Features

✅ Registration Form with validation

Fields: Name, Email, Register No, Phone, Organization, Role, Experience, Interests

Email format validation using Regex

✅ Success message after registration

✅ Data storage on backend (logged & retrievable)

✅ View Registrations page to see all submitted entries

✅ Extra Pages: Home, About, Speakers, Schedule

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript (Hosted on GitHub Pages)

Backend: Node.js + Express (Hosted on Render)

Data: Stored temporarily in memory / JSON file (not permanent in free-tier)

📂 Project Structure
event-registration-system/
│
├── public/              # Frontend files
│   ├── index.html       # Home page with registration form
│   ├── about.html       # About page
│   ├── speakers.html    # Speakers page
│   ├── schedule.html    # Schedule page
│   ├── script.js        # Form logic + fetch API
│   └── styles.css       # Styling
│
├── server.js            # Backend server (Express API)
├── package.json         # Node.js dependencies
└── README.md            # Project documentation

⚡ How It Works

User fills out the form on the frontend.

Data is sent via Fetch API to backend endpoint:

POST /register → saves registration

GET /registrations → fetch all registrations

Frontend shows success message or error.

Registrations can be viewed from the View Registrations page.
