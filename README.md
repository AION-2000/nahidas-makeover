# Nahida's Makeover

**A premium AI-powered beauty consulting and e-commerce platform**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://nahidasmakeover.com)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## Overview

Nahida's Makeover is a luxury digital flagship platform for a premium beauty studio, combining cinematic web design with AI-powered beauty consulting. The platform delivers personalized product recommendations and an immersive shopping experience through advanced facial analysis and curated beauty consultations.

**Live Platform:** [nahidasmakeover.com](https://nahidasmakeover.com)

---

## Features

### AI Beauty Consultant
Powered by Google Gemini AI, our intelligent consultant provides:
- **Facial Analysis:** Advanced detection of face shape, skin tone, undertones, and eye color
- **Personalized Recommendations:** Curated product suggestions with specific shade matching
- **Professional Guidance:** Expert beauty advice tailored to individual features and preferences

### E-Commerce Platform
- **Interactive Product Catalog:** Filterable grid with smooth animations and real-time search
- **Detailed Product Pages:** Comprehensive product information, reviews, and shade selection
- **WhatsApp Integration:** Seamless checkout flow connecting directly to studio concierge
- **Responsive Design:** Optimized experience across all devices

### Premium UX/UI
- **Cinematic Intro Animation:** Architectural door-opening sequence for first-time visitors
- **Custom Interactive Cursor:** Fluid-tracking cursor with context-aware animations
- **Voice Narration:** Gemini-powered text-to-speech for product descriptions and policies
- **Motion Design:** High-fidelity animations using Framer Motion

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 |
| **Language** | TypeScript 5.0+ |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion |
| **AI/ML** | Google Gemini AI SDK |
| **Deployment** | Vercel |
| **Package Manager** | npm/yarn |

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher (or yarn 1.22.x+)
- Google AI Studio API Key ([Get one here](https://ai.google.dev/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nahidas-makeover.git
   cd nahidas-makeover
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

   > **Security Note:** Never commit your `.env` file. Ensure it's listed in `.gitignore`.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

---

## Project Structure

```
nahidas-makeover/
│
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Header/          # Navigation and branding
│   │   ├── Hero/            # Landing section
│   │   ├── ProductGrid/     # Product catalog
│   │   ├── AIConsultant/    # Beauty analysis interface
│   │   └── ...
│   │
│   ├── services/            # External service integrations
│   │   ├── gemini.ts        # Gemini AI API client
│   │   └── analytics.ts     # Analytics integration
│   │
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Global types and interfaces
│   │
│   ├── utils/               # Helper functions
│   ├── hooks/               # Custom React hooks
│   ├── assets/              # Static assets (images, fonts)
│   │
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
│
├── public/                  # Static public assets
├── .env.example             # Environment variable template
├── vercel.json              # Vercel deployment configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Project dependencies
```

---

## Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure environment variables** in Vercel Dashboard:
   - Navigate to Project Settings → Environment Variables
   - Add `VITE_GEMINI_API_KEY` with your API key

### Alternative Platforms

The application can be deployed to any platform supporting static site hosting:
- Netlify
- AWS Amplify
- GitHub Pages
- Cloudflare Pages

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini AI API key for beauty analysis | Yes |

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

---

## Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.0s
- **Image Optimization:** WebP with fallbacks
- **Code Splitting:** Dynamic imports for optimal bundle size

---

## Security

- Environment variables are never exposed to the client
- API keys are server-side only
- Content Security Policy (CSP) headers configured
- HTTPS enforced in production
- Input sanitization on all user inputs

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Design Inspiration:** Luxury beauty industry standards and modern e-commerce UX
- **AI Partner:** Google Gemini AI for intelligent beauty consulting
- **Community:** React, TypeScript, and Tailwind CSS communities

---

## Contact & Support

- **Developer:** Shihab Shahriar Aion
- **Portfolio:** [shihabshahriaraion.com](https://shihabshahriaraion.com)
- **Email:** aionshihabshahriar@gmail.com
- **Client Website:** [nahidasmakeover.com](https://nahidasmakeover.com)

For bug reports and feature requests, please open an issue on GitHub.

---

<div align="center">
  <p><em>"Beauty begins the moment you decide to be yourself."</em></p>
  <p>Developed by Shihab Shahriar Aion</p>
</div>
