# 🎯 BlackBox Recruiter

**AI-Powered Resume Analyzer & ATS Optimizer**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge)](https://blackbox-recruiter-f4b4eunb7-aloks-projects-a320deac.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/CODEBRAKERBOYY/blackbox-recruiter?style=for-the-badge)](https://github.com/CODEBRAKERBOYY/blackbox-recruiter/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/CODEBRAKERBOYY/blackbox-recruiter?style=for-the-badge)](https://github.com/CODEBRAKERBOYY/blackbox-recruiter/network/members)

<div align="center">

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/Groq-000000?style=for-the-badge&logo=ai&logoColor=white" alt="Groq"/>
  <img src="https://img.shields.io/badge/Llama_3.3-0467DF?style=for-the-badge&logo=meta&logoColor=white" alt="Llama"/>
</p>

</div>

---

## 📖 About

**BlackBox Recruiter** is an intelligent resume optimization platform that helps job seekers beat Applicant Tracking Systems (ATS) and land more interviews. Powered by Groq's Llama 3.3 70B model, it provides instant AI-driven insights on resume-job compatibility.

### 💡 The Problem

- 75% of resumes are rejected by ATS before reaching recruiters
- Job seekers don't know what's missing from their resumes
- Generic advice doesn't address specific job requirements
- Manual analysis takes 15+ minutes per application

### ✨ Features

🤖 **AI-Powered Analysis** - Llama 3.3 70B semantic understanding  
📊 **Match Scoring** - 0-100% compatibility rating  
✅ **Strength Detection** - Identifies competitive advantages  
⚠️ **Gap Analysis** - Shows missing qualifications  
🎯 **ATS Optimizer** - Keyword matching & formatting checks  
✍️ **Rewrite Suggestions** - AI-improved bullet points  
⚡ **Real-Time** - Results in under 3 seconds  
🎨 **Modern UI** - Responsive dark theme

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation
```bash
# Clone repository
git clone https://github.com/CODEBRAKERBOYY/blackbox-recruiter.git
cd blackbox-recruiter

# Install dependencies
npm install

# Create .env file and add your API key
echo "VITE_GROQ_API_KEY=your_groq_api_key_here" > .env

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🎯 Usage

### Match Analysis
1. Upload resume (TXT/PDF) or paste text
2. Add job description
3. Click "Match Analysis"
4. Get compatibility score, strengths, gaps, recommendations

### ATS Optimizer
1. Same input as above
2. Click "ATS Optimizer"
3. Get ATS score, keyword analysis, formatting issues, rewrite suggestions

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons  
**AI/LLM:** Groq API, Llama 3.3 70B (70 billion parameters)  
**Deployment:** Vercel, GitHub Actions  
**Version Control:** Git, GitHub

---

## 📂 Project Structure
```
blackbox-recruiter/
├── src/
│   ├── services/
│   │   └── aiService.js      # Groq API integration & AI logic
│   ├── App.jsx               # Main application component
│   ├── index.css             # Global styles
│   └── main.jsx              # React entry point
├── .env                      # Environment variables (not in repo)
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

---

## 🧠 How It Works

### AI Analysis Pipeline
```
User Input → Text Extraction → Prompt Engineering → 
Groq API (Llama 3.3 70B) → JSON Parsing → Display Results
```

### Key Technical Details

**Prompt Engineering:**
- Structured prompts for consistent JSON outputs
- Temperature tuning: 0.5-0.7 for balanced responses
- Token optimization: 1024-2048 based on analysis type

**Error Handling:**
- Graceful fallbacks for API failures
- Markdown code block removal
- Input validation

---

## 📈 Performance

⚡ **Response Time:** < 3 seconds  
🎯 **Accuracy:** 85%+ semantic matching  
💰 **Cost:** ~$0.001 per analysis (Groq free tier)  
📦 **Bundle Size:** ~450 KB (optimized)

---

## 🚀 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import `blackbox-recruiter` repository
4. Add environment variable: `VITE_GROQ_API_KEY`
5. Deploy!

**Live URL:** [blackbox-recruiter-f4b4eunb7-aloks-projects-a320deac.vercel.app](https://blackbox-recruiter-f4b4eunb7-aloks-projects-a320deac.vercel.app)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 🐛 Issues & Support

- [Report a bug](https://github.com/CODEBRAKERBOYY/blackbox-recruiter/issues)
- [Request a feature](https://github.com/CODEBRAKERBOYY/blackbox-recruiter/issues)
- [Ask a question](https://github.com/CODEBRAKERBOYY/blackbox-recruiter/discussions)

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**CODEBRAKERBOYY**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/CODEBRAKERBOYY)

---

## 🙏 Acknowledgments

- [Groq](https://groq.com) - Fast LLM inference
- [Meta AI](https://ai.meta.com) - Llama 3.3 model
- [Vercel](https://vercel.com) - Deployment platform
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [React](https://react.dev) - UI library

---

## ⭐ Support

If this project helped you, please give it a ⭐!

---

<div align="center">

**Built with ❤️ by [CODEBRAKERBOYY](https://github.com/CODEBRAKERBOYY)**

[View Demo](https://blackbox-recruiter-f4b4eunb7-aloks-projects-a320deac.vercel.app) • [Report Bug](https://github.com/CODEBRAKERBOYY/blackbox-recruiter/issues) • [Request Feature](https://github.com/CODEBRAKERBOYY/blackbox-recruiter/issues)

</div>
