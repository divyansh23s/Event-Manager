📌 Project Overview

The Event Management Web Application is a full-stack project developed during my internship at BugendaiTech.
It is designed to help users create, view, manage, and track events using a modern, responsive interface along with secure backend APIs.

The system supports:

User authentication (Signup/Login)

Token-based authorization (JWT)

Create, Read, Update, Delete (CRUD) operations for events

Event details with countdown timer

Responsive UI with modern Tailwind styling

API-based architecture using Node.js/Express

MySQL database using Sequelize ORM

🚀 Key Features

Authentication System

Signup, login, JWT-based security

Protected routes on frontend

Event Management

Add new events

Edit/update existing events

Delete events

View event list and detailed pages

Real-Time Countdown Timer
Each event has a built-in countdown to the scheduled date/time.

Filtering & Sorting (Optional)

Toast Notifications for all operations

Fully Responsive UI

🛠️ Tech Stack
Frontend

React.js (React 18)

React Router DOM

Axios

Tailwind CSS

Context API for authentication

Vite bundler

Backend

Node.js

Express.js

Sequelize ORM

JSON Web Tokens (JWT)

CORS enabled APIs

Database

MySQL / MariaDB (Workbench or CLI)

📂 Project Structure
my-event-app/
│
├── frontend/

│   ├── src/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── context/AuthContext.jsx

│   │   ├── App.jsx

│   │   └── main.jsx

│   └── index.html
│
└── backend/

    ├── controllers/
    ├── models/
    
    ├── routes/
    
    ├── middleware/
    
    ├── config/config.json
    
    ├── server.js
    
    └── package.json

⚙️ Installation & Setup
Prerequisites

Ensure you have installed:

Node.js

MySQL/MariaDB

npm / yarn

VS Code (recommended)

Backend Setup
cd backend
npm install

Configure Database

Edit the file:

backend/config/config.json


Set MySQL username, password, host, database name.

Run Backend
npm start

Frontend Setup
cd frontend
npm install
npm run dev

🔐 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/signup	Register new user
POST	/api/auth/login	Login & get token
Event Routes
Method	Endpoint	Description
GET	/api/events	Get all events
POST	/api/events	Add new event
GET	/api/events/:id	Get event details
PUT	/api/events/:id	Update event
DELETE	/api/events/:id	Delete event

All event routes require Bearer Token authentication.

🎨 UI/UX Features

Tailwind-based clean layout

Navbar with login/logout state

Forms with validation

Toast notifications for success/failure

Mobile responsive grid & card layout

🛡️ Security

Password hashing with bcrypt

JWT-based session control

Protected backend routes

Axios interceptors for attaching tokens

Cross-Origin Resource Sharing enabled

📈 Future Enhancements

Event Category & Tag Filters

User roles (Admin / User)

Event Registration System

Search bar & advanced filtering

Email reminders for events

Export event list to PDF/Excel

Dashboard with analytics (charts)

👨‍💻 Developer

Divyansh Singh
Web Development Intern — BugendaiTech
Tech Stack: React, Node.js, Express, MySQL

📄 License

This project is for educational and internship training purposes.# event-manager

📂 Project Structure

my-event-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   │   └── config.json
│   ├── server.js
│   └── package.json

