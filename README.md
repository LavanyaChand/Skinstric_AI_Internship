# Skinstric A.I.

> Sophisticated skincare powered by artificial intelligence.

Developed a computer vision A.I. that analyses your facial features to predict your demographic profile - race, age group, and gender - then uses that data to generate a highly-personalised skincare routine built for your exact skin needs.

## 🔗 Live Demo

**[https://skinstric-ai-internship-beige.vercel.app/](https://skinstric-ai-internship-beige.vercel.app/)**

---

## ✨ Features

- **AI Facial Analysis** - Computer vision scans your face and predicts your race, age group, and gender, each with a confidence percentage
- **126 Unique Skin Profiles** - Built from 7 race categories × 9 age groups × 2 gender identities
- **Camera or Gallery Upload** - Take a live selfie or upload a photo from your device
- **Correctable Predictions** - Review and override any AI estimate before generating your routine
- **Personalized Routine** - Generates a step-by-step morning and evening skincare routine with targeted ingredients and explanations
- **Privacy First** - Images are analyzed in-session via a secure API and never stored or sold
- **Responsive Design** - Fully responsive with smooth animations across desktop and mobile

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| State Management | Zustand |
| Forms | React Hook Form + Zod |
| HTTP Client | Axios |
| Notifications | Sonner |
| Icons | FontAwesome, Lucide React |
| Deployment | Vercel |

---

## 📱 App Flow

```
Landing (/)
  ├── Discover A.I. (/about)       - How the technology works
  └── Take Test (/testing)         - Enter your name & location
        └── Upload Photo (/result) - Camera capture or gallery upload
              └── Demographics (/summary) - Review AI predictions (race, age, gender)
                    └── Routine (/routine) - Your personalized AM/PM skincare routine
```

---

## 🚀 Running Locally

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repository
git clone https://github.com/LavanyaChand/Skinstric_AI_Internship.git
cd Skinstric_AI_Internship

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start the production server |
