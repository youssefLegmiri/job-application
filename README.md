# 🧑‍💼 Job Application Portal — Full Stack App

This is a full-stack job application platform built with the **MERN** stack (MongoDB, Express, React, Node.js). It allows **admins** to manage job listings and **job seekers** to browse, apply for jobs, and track their application status.

---

## 🚀 Tech Stack

### 🖥️ Frontend

- **React 19**
- **React Router** – for client-side routing
- **Tailwind CSS** – for styling and responsive UI

### 🛠️ Backend

- **Express.js** – RESTful API
- **MongoDB (with Mongoose for data modeling)** – NoSQL database for storing job listings and applications

---

## ✨ Features

### 👨‍💼 Admin

- Create, read, update, and delete job offers (CRUD)
- Manage all job listings

### 👨‍🎓 Job Seeker

- View available job offers
- Apply for jobs
- Track application status

---

🚀 Getting Started
Follow these steps to run the project locally:

📦 Prerequisites
Make sure you have the following installed:

Node.js (v18 or higher recommended)

npm (comes with Node.js) or yarn

📥 Installation

1.Clone the repository:
git clone https://github.com/youssefLegmiri/job-application.git

2.Navigate to FrontEnd (react.js):

cd FrontEnd
npm install
npm run dev

3.Navigate to BackEnd (express.js):

Create a .env file in the BackEnd directory and add your environment variables.

Create an uploads folder in the root of the BackEnd directory (used for storing user profile images temporarily; Cloudinary integration will be added later).

cd ../BackEnd
npm install
npm start
