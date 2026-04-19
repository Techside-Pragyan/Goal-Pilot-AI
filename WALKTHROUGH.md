# Getting Started with GoalPilot AI

Follow these steps to run the application locally.

## 📋 Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Google Gemini API Key (Get it from [Google AI Studio](https://aistudio.google.com/))

## 🚀 Installation & Setup

### 1. Backend Setup
1. Open the `server` directory:
   ```bash
   cd server
   ```
2. Create a `.env` file from the example:
   ```bash
   cp ../.env.example .env
   ```
3. Update `.env` with your MongoDB URI, JWT Secret, and **Gemini API Key**.
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and go to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

## 🎯 Usage Guide
1. **Sign Up**: Create an account via the Auth page.
2. **Dream Big**: Go to "New Goal" and enter a 5-year vision (e.g., "Become a world-class chef").
3. **AI Architecture**: Watch as the AI breaks it into a 5-year roadmap and generates your first week of tasks.
4. **Daily Action**: Use the Daily Planner to mark tasks complete and chat with Coach Gemini for motivation.

## ✨ Features
- **Goal Decomposition**: High-level vision -> Yearly -> Weekly targets.
- **Adaptive Intelligence**: Real-time task management.
- **AI Coach**: Interactive chat for productivity advice.
- **Modern UI**: Dark mode, glassmorphism, and smooth animations.
