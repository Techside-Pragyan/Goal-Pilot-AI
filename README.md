# 🎯 GoalPilot AI

![GoalPilot AI Hero](https://via.placeholder.com/1200x600/0f172a/38bdf8?text=GoalPilot+AI+-+Your+Personal+AI+Life+Coach)

> An intelligent life-coaching and goal-management platform powered by Google Gemini AI.

GoalPilot AI is a modern full-stack web application designed to help users achieve their long-term visions. By leveraging advanced AI, it breaks down ambitious 5-year goals into actionable yearly, weekly, and daily targets. It features an interactive AI coach to provide motivation, productivity advice, and real-time task management.

---

## ✨ Key Features

- **🧠 AI Goal Decomposition**: Enter a high-level vision and watch the AI architect a structured roadmap (5-Year -> Yearly -> Weekly targets).
- **🤖 Interactive AI Coach**: Chat directly with "Coach Gemini" for personalized productivity advice, motivation, and task guidance.
- **📅 Daily Action Planner**: Manage your daily tasks with an adaptive and intuitive interface.
- **📊 Progress Visualization**: Track your goal completion and performance metrics through beautiful, interactive charts.
- **🎨 Modern Aesthetic**: Enjoy a sleek, premium UI featuring dark mode, glassmorphism effects, and smooth micro-animations.
- **🔐 Secure Authentication**: Robust user authentication and data protection using JWT and bcrypt.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling & Animations**: Vanilla CSS (Dark Mode/Glassmorphism) + Framer Motion
- **Icons & Graphics**: Lucide React + Recharts
- **HTTP Client**: Axios
- **Routing**: React Router DOM

### Backend
- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB & Mongoose
- **AI Integration**: Google Generative AI (Gemini API)
- **Security**: JWT (JSON Web Tokens), Bcrypt.js, CORS

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- **Google Gemini API Key** (Get it for free from [Google AI Studio](https://aistudio.google.com/))

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Techside-Pragyan/Goal-Pilot-AI.git
cd Goal-Pilot-AI
```

### 2. Backend Setup
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file based on the provided example:
```bash
cp ../.env.example .env
```

Update the `.env` file with your credentials:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-life-coach
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend development server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window, navigate to the `client` directory, and install dependencies:
```bash
cd client
npm install
```

Start the Vite development server:
```bash
npm run dev
```

The application will typically be available at `http://localhost:5173`.

---

## 🎯 Usage Guide

1. **Sign Up / Log In**: Create a new account to access your personalized dashboard.
2. **Dream Big**: Navigate to "New Goal" and input a comprehensive long-term vision (e.g., "Become a world-class chef in 5 years").
3. **Review AI Architecture**: Watch as the AI instantly processes your vision, generating a detailed roadmap and your first week of actionable tasks.
4. **Daily Action**: Utilize the Daily Planner to mark tasks as complete.
5. **Seek Guidance**: Open the chat interface to consult with Coach Gemini whenever you need motivation or strategic advice.

---

## 📁 Project Structure

```text
Goal-Pilot-AI/
├── client/                 # React Frontend (Vite)
│   ├── public/             # Static assets
│   ├── src/                # React components, pages, and styles
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── server/                 # Node.js Backend
│   ├── index.js            # Express application entry point
│   ├── routes/             # API route definitions
│   ├── models/             # Mongoose database schemas
│   ├── middleware/         # Custom Express middleware (e.g., Auth)
│   ├── services/           # External service integrations (e.g., Gemini API)
│   └── package.json        # Backend dependencies
├── .env.example            # Example environment variables template
├── WALKTHROUGH.md          # Quick start and application walkthrough
└── README.md               # Project documentation
```

---

## 📄 License

This project is licensed under the terms included in the `LICENSE` file.