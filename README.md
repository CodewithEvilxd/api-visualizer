# API Visualizer

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)](https://tailwindcss.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini_AI-Enabled-orange)](https://ai.google.dev/)

A modern, intelligent API response visualizer built with Next.js, designed to help developers understand and analyze API responses effortlessly. Features AI-powered analysis using Google Gemini to provide insights and answer questions about your API data.

## ✨ Features

- **Multi-Format Support**: Handle JSON, XML, and raw text API responses
- **Beautiful Visualization**: 
  - Tree view for exploring nested JSON structures
  - Pretty-printed formatting with syntax highlighting
  - Raw text view for plain responses
- **AI-Powered Analysis**: 
  - Automatic API response analysis using Google Gemini AI
  - Ask questions about your API data
  - Get insights on API purpose and use cases
- **Developer-Friendly Tools**:
  - One-click beautification
  - File upload support
  - Copy to clipboard
  - Download formatted responses
  - Keyboard shortcuts (Ctrl+B for beautify, Ctrl+C for copy)
- **Modern UI**: 
  - Responsive design with dark/light theme support
  - Smooth animations with Framer Motion
  - Built with shadcn/ui components
- **Performance**: Fast parsing and rendering of large API responses

## 🚀 Demo

Visit the live demo at [https://api-visualizer-demo.vercel.app](https://api-visualizer-demo.vercel.app) (replace with your actual deployment URL)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodewithEvilxd/api-visualizer.git
   cd api-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the project root:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

   Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Usage

1. **Navigate to the Tool**: Click "Try Tool" on the homepage or go to `/tool`

2. **Input Your API Response**:
   - Paste your API response directly into the textarea
   - Or upload a file using the "Upload" button
   - Select the format: JSON, XML, or Raw

3. **Visualize**:
   - Switch between Tree, Pretty, and Raw views
   - Use the Tree view to explore nested JSON structures
   - Pretty view shows formatted, color-coded output

4. **AI Analysis**:
   - Click "Analyze" to get AI insights about your API response
   - Ask specific questions in the AI panel for detailed answers

5. **Export**:
   - Copy formatted content to clipboard
   - Download as a file
   - Clear all data when done

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + B`: Beautify the current input
- `Ctrl/Cmd + C`: Copy content to clipboard

## 🏗️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer-motion.com/)
- **AI**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Themes**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 📁 Project Structure

```
api-visualizer/
├── src/
│   ├── app/
│   │   ├── api/analyze/          # AI analysis API route
│   │   ├── tool/                 # Main tool page and components
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Landing page
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   └── aurora.tsx            # Aurora background effect
│   └── lib/
│       └── utils.ts              # Utility functions
├── public/                       # Static assets
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [Google Gemini](https://ai.google.dev/)
- Icons by [Lucide](https://lucide.dev/)

## 📞 Contact

- **GitHub**: [@CodewithEvilxd](https://github.com/codewithevilxd)
- **Project Repository**: [https://github.com/CodewithEvilxd/api-visualizer](https://github.com/CodewithEvilxd/api-visualizer)

---

Made with ❤️ by [codewithevilxd](https://github.com/codewithevilxd)
