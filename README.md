# 🎯 Claim Leaderboard App

A simple full-stack leaderboard app where users can **claim random points**, and the system selects a **random winner**. Points reset on demand!

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB Atlas (Mongoose)
- **Other**: Axios, CORS

---

## 📸 Features

- 🔘 View all users
- ✅ Claim random points
- 🎉 Random winner selection
- 🔁 Reset all user scores
- 🏆 Live-updating leaderboard

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/claim-leaderboard.git
cd claim-leaderboard
2. Backend setup
bash
Copy
Edit
cd claim-leaderboard-backend
npm install
Create a .env file with your Mongo URI:

ini
Copy
Edit
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/leaderboard
Run the backend:

bash
Copy
Edit
node seed.js         # (to add initial users)
node app.js
3. Frontend setup
bash
Copy
Edit
cd ../claim-leaderboard-frontend
npm install
npm run dev
📦 Folder Structure
bash
Copy
Edit
claim-leaderboard/
├── claim-leaderboard-backend/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── seed.js
│   └── .env
├── claim-leaderboard-frontend/
│   ├── components/
│   ├── App.jsx
│   └── index.html
└── README.md
💻 Live Preview
Not deployed yet. You can run it locally using the instructions above.

🙌 Author
Made with ❤️ by Kamal Sharma
LinkedIn Profile