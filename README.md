# 🛠️ FixIt - Community Issue Reporting App

FixIt is a **full-stack MERN application** that allows users to report community issues by submitting descriptions, images, and optionally geotag locations. Admins can view, manage, and delete these reports from a secure dashboard.

---

## 🚀 Features

* 🧑‍💻 User-friendly issue submission (title, description, category)
* 📷 Image upload support (proof of issue)
* 📍 Optional geolocation (Google Maps integration)
* 🔐 Admin authentication (login & logout)
* 🗃️ Admin dashboard to view/manage/delete reports
* 📸 Modal preview for uploaded images
* ⚡ Built with the MERN stack (MongoDB, Express, React, Node.js)

---

## 🛠 Tech Stack

* **Frontend:** React, Axios, Tailwind CSS / custom CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Local or Atlas)
* **Auth:** JWT-based Admin Login
* **File Uploads:** Multer (or similar)
* **Deployment:** Coming soon…

---

## 📂 Project Structure

```bash
FixIt/
├── backend/                 # Backend (Node.js + Express + MongoDB)
│   ├── config/              # DB connection & configs
│   ├── controllers/         # Controller logic (issues, auth)
│   ├── middleware/          # Auth middleware (JWT validation)
│   ├── models/              # Mongoose models (Issue, Admin)
│   ├── routes/              # API routes
│   ├── uploads/             # Uploaded images
│   ├── server.js            # App entry point
│   └── package.json         # Backend dependencies
│
├── frontend/                # Frontend (React)
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable components (forms, modals, navbar)
│   │   ├── pages/           # Pages (Home, Admin Dashboard, Login)
│   │   ├── services/        # API calls (Axios)
│   │   ├── App.js           # Root component
│   │   └── index.js         # Entry point
│   └── package.json         # Frontend dependencies
│
├── README.md                # Documentation
└── .gitignore               # Ignored files
```

---

## ⚙️ Installation & Setup

### 1) Clone the repo

```bash
git clone https://github.com/your-username/FixIt.git
cd FixIt
```

### 2) Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm start
```

### 3) Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔌 API Endpoints (sample)

> Base URL: `http://localhost:5000/api`

* **POST** `/auth/login` – Admin login
* **GET** `/issues` – List all issues (admin)
* **POST** `/issues` – Create an issue (user form)
* **DELETE** `/issues/:id` – Delete an issue (admin)

---

## 🛡️ Security

* Passwords hashed using **bcryptjs**
* Admin authentication with **JWT**
* Input validation for submissions


---

## 🚧 Roadmap

* [ ] Deploy frontend (Vercel) & backend (Render/Heroku)
* [ ] Email/Push notifications for new issues
* [ ] Role-based access (multi-admin)
* [ ] Analytics dashboard (reports by category, area, time)

---

## 🤝 Contributing

Contributions are welcome! Fork the repo, create a feature branch, and open a PR.

---

## 👨‍💻 Author

**Preetham G Shiva**
Full Stack Developer | MERN | Python | AI/ML Enthusiast
