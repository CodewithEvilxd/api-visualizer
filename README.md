# API Visualizer

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)](https://tailwindcss.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini_AI-Enabled-orange)](https://ai.google.dev/)
[![Fully Responsive](https://img.shields.io/badge/Responsive-All_Devices-green)](https://tailwindcss.com/)
[![Postman Alternative](https://img.shields.io/badge/Postman_Alternative-Professional-blue)](https://www.postman.com/)

A **professional API testing and visualization platform** built with Next.js, featuring advanced testing capabilities, collections management, scripting, and AI-powered analysis. Perfect for developers who need powerful API testing tools with an intuitive, responsive interface.

## ✨ Features

### 🚀 **Professional API Testing Suite**
- **Full HTTP Methods**: GET, POST, PUT, PATCH, DELETE with proper handling
- **Advanced Request Configuration**:
  - Custom headers with JSON editor
  - URL parameters with dynamic key-value pairs
  - Multiple body formats: JSON, Raw Text, URL-encoded, GraphQL
  - File upload support for request bodies

### 🔧 **Authentication & Security**
- **Bearer Token**: JWT and API token authentication
- **API Key**: Header-based API key authentication
- **Basic Auth**: Username/password with automatic base64 encoding
- **Collection-Level Auth**: Apply auth to entire request collections

### 📁 **Collections Management**
- **Organize Requests**: Create named collections for API endpoints
- **Batch Operations**: Run entire collections sequentially
- **Collection-Level Settings**: Shared auth, headers, and tests
- **Persistent Storage**: Collections saved locally and sync-ready

### ⚙️ **Advanced Scripting**
- **Pre-request Scripts**: JavaScript execution before sending requests
  - Variable interpolation with `{{variable}}` syntax
  - Dynamic header/body modification
  - Environment and global variable management
- **Test Scripts**: Post-response validation and assertions
  - Chai-style assertions: `pm.expect().to.be.equal()`
  - Status code validation, header checks, response body tests
  - Custom test logic with full JavaScript support

### 🔄 **Data-Driven Testing (Runner)**
- **JSON Data Arrays**: Run requests with multiple data sets
- **Iteration Control**: Configurable number of test iterations
- **Variable Binding**: Use iteration data in requests dynamically
- **Result Aggregation**: Collect and analyze test results

### ⚡ **Performance & Reliability**
- **Timeout Control**: Configurable request timeouts (default 30s)
- **Retry Logic**: Automatic retries on failure with backoff
- **Redirect Handling**: Follow or manual redirect control
- **Proxy Support**: HTTP proxy configuration for testing

### 📊 **Response Analysis & Visualization**
- **Multi-Format Support**: JSON, XML, Raw text, GraphQL responses
- **Advanced Visualization**:
  - Interactive tree view for nested JSON exploration
  - Pretty-printed formatting with syntax highlighting
  - Raw text view with copy/download options
  - Response tabs: Body, Headers, Cookies, Timeline
- **AI-Powered Analysis**:
  - Automatic API response insights using Google Gemini AI
  - Ask specific questions about response data
  - Get intelligent explanations of API purposes

### 💾 **Data Management**
- **Request History**: Local storage of recent requests
- **Save/Load Requests**: Persistent request templates
- **Export/Import**: Share request collections
- **File Operations**: Upload response files for analysis

### 🎨 **Modern, Responsive UI**
- **Mobile-First Design**: Perfect experience on phones, tablets, desktops
- **Adaptive Layouts**: Components resize and reorganize for screen size
- **Touch-Optimized**: Large touch targets and gestures
- **Dark/Light Themes**: System preference detection with manual toggle
- **Smooth Animations**: Framer Motion powered transitions

### ⌨️ **Developer Experience**
- **Keyboard Shortcuts**: Ctrl/Cmd+B (beautify), Ctrl/Cmd+C (copy)
- **Command Palette**: Quick navigation and actions
- **IntelliSense**: Smart suggestions for headers, methods, etc.
- **Error Handling**: Comprehensive error states and recovery
- **Performance Monitoring**: Response time and size tracking

## 🚀 Demo

Visit the live demo at [https://api-visualizer-xd.vercel.app](https://api-visualizer-xd.vercel.app)

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

### **API Testing Interface**

1. **Access the Tool**: Navigate to `/tool` or click "Try Tool" from the homepage

2. **Configure Your Request**:
    - **Method**: Select HTTP method (GET, POST, PUT, PATCH, DELETE)
    - **URL**: Enter your API endpoint URL
    - **Headers**: Add custom headers in JSON format
    - **Body**: Choose format (JSON, Raw, URL-encoded, GraphQL) and enter request body
    - **Params**: Add URL query parameters dynamically
    - **Auth**: Configure authentication (Bearer, API Key, Basic)

3. **Advanced Configuration**:
    - **Pre-request Scripts**: JavaScript to run before sending (use `pm.variables.set()`)
    - **Test Scripts**: Validation scripts to run after response (use `pm.expect()`)
    - **Variables**: Define reusable variables with `{{variable}}` syntax
    - **Settings**: Configure timeout, retries, redirects, and proxy

4. **Send & Analyze**:
    - Click "Send" to execute the request
    - View response in multiple tabs: Body, Headers, Cookies, Timeline
    - Use AI analysis to understand response data and ask questions

5. **Collections Management**:
    - Create named collections to organize related requests
    - Save current request to a collection
    - Run entire collections with shared auth/headers/tests
    - Apply collection-level authentication and settings

6. **Data-Driven Testing**:
    - Use the Runner with JSON data arrays for multiple iterations
    - Variables are interpolated from iteration data
    - Results are collected and can be analyzed

### **Response Visualization**

- **Tree View**: Interactive exploration of nested JSON structures
- **Pretty View**: Syntax-highlighted, formatted display
- **Raw View**: Plain text with copy/download options
- **AI Insights**: Automatic analysis and Q&A about response data

### **Keyboard Shortcuts**
- `Ctrl/Cmd + B`: Beautify current content
- `Ctrl/Cmd + C`: Copy to clipboard

## 🔧 **Advanced Scripting Examples**

### **Pre-request Scripts**
```javascript
// Set dynamic authentication token
pm.variables.set('token', 'Bearer ' + Date.now());

// Environment-based configuration
if (pm.environment.get('environment') === 'production') {
    pm.variables.set('baseUrl', 'https://api.production.com');
} else {
    pm.variables.set('baseUrl', 'https://api.staging.com');
}

// Generate timestamp for unique requests
pm.variables.set('timestamp', new Date().toISOString());
```

### **Test Scripts**
```javascript
// Basic status and response validation
pm.test('Status code is 200', () => {
    pm.expect(pm.response.status).to.be.equal(200);
});

pm.test('Response time is less than 1000ms', () => {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

// JSON response validation
pm.test('Response has required fields', () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData).to.have.property('name');
    pm.expect(jsonData.name).to.be.a('string');
});

// Header validation
pm.test('Content-Type is JSON', () => {
    pm.expect(pm.response.headers).to.have.header('Content-Type', 'application/json');
});

// Array length validation
pm.test('Returns exactly 10 items', () => {
    pm.expect(pm.response.json()).to.have.lengthOf(10);
});
```

### **Runner Data Examples**
```json
[
  { "userId": 1, "title": "Test Post 1", "completed": false },
  { "userId": 2, "title": "Test Post 2", "completed": true },
  { "userId": 3, "title": "Test Post 3", "completed": false }
]
```

### **Collection-Level Scripts**
```javascript
// Collection pre-request script
pm.variables.set('apiKey', pm.collectionVariables.get('sharedApiKey'));

// Collection test script
pm.test('All responses have success status', () => {
    pm.expect(pm.response.status).to.be.oneOf([200, 201, 202]);
});
```

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + B`: Beautify the current input
- `Ctrl/Cmd + C`: Copy content to clipboard

## 🏗️ Tech Stack

### **Core Framework & Language**
- **Framework**: [Next.js 15](https://nextjs.org/) with App Router and React Server Components
- **Language**: [TypeScript](https://www.typescriptlang.org/) with strict type checking
- **Runtime**: Node.js with Edge Runtime support for API routes

### **Frontend & UI**
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design system
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) built on [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer-motion.com/) for smooth transitions
- **Icons**: [Lucide React](https://lucide.dev/) for consistent iconography
- **Themes**: [next-themes](https://github.com/pacocoursey/next-themes) with system preference detection
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) for toast notifications

### **API & Data**
- **HTTP Client**: Native fetch API with advanced proxy support
- **AI Integration**: [Google Generative AI (Gemini)](https://ai.google.dev/) for intelligent analysis
- **Data Persistence**: Browser localStorage for collections and history
- **Scripting Engine**: JavaScript eval-based execution for pre-request/test scripts

### **Development & Build**
- **Build Tool**: Next.js built-in webpack with SWC compiler
- **Linting**: ESLint with Next.js and TypeScript rules
- **Code Formatting**: Prettier integration
- **Type Checking**: TypeScript with path mapping and module resolution

### **Advanced Features**
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Code splitting, lazy loading, and optimized bundles
- **Security**: CORS handling, input validation, and secure API proxying

## 📁 Project Structure

```
api-visualizer/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analyze/          # AI analysis API route
│   │   │   └── proxy/            # API proxy for testing external APIs
│   │   ├── tool/                 # Main API testing interface
│   │   │   ├── page.tsx          # Tool page with API tester
│   │   │   ├── ai-panel.tsx      # AI analysis panel
│   │   │   └── shortcuts.tsx     # Keyboard shortcuts
│   │   ├── globals.css           # Global styles with Tailwind
│   │   ├── layout.tsx            # Root layout with navigation
│   │   ├── page.tsx              # Landing page with hero section
│   │   ├── about/                # About page
│   │   ├── docs/                 # Documentation page
│   │   └── [other pages]/        # Additional static pages
│   ├── components/
│   │   ├── api-tester.tsx        # Main API testing component
│   │   ├── aurora.tsx            # Aurora background animation
│   │   ├── command-palette.tsx   # Command palette for navigation
│   │   ├── navbar-mobile.tsx     # Mobile navigation
│   │   ├── theme-toggle.tsx      # Dark/light theme toggle
│   │   └── ui/                   # Complete shadcn/ui component library
│   │       ├── button.tsx        # Button variants and sizes
│   │       ├── card.tsx          # Card layouts
│   │       ├── dialog.tsx        # Modal dialogs
│   │       ├── dropdown-menu.tsx # Dropdown menus
│   │       ├── input.tsx         # Form inputs
│   │       ├── scroll-area.tsx   # Custom scrollbars
│   │       ├── separator.tsx     # Visual separators
│   │       ├── sheet.tsx         # Slide-out panels
│   │       ├── tabs.tsx          # Tabbed interfaces
│   │       ├── textarea.tsx      # Multi-line text inputs
│   │       └── tooltip.tsx       # Hover tooltips
│   ├── lib/
│   │   └── utils.ts              # Utility functions (cn, etc.)
│   └── types/
│       └── global.d.ts           # TypeScript declarations
├── public/                       # Static assets (icons, images)
├── .env.local                    # Environment variables
├── package.json                  # Dependencies and scripts
├── tailwind.config.ts            # Tailwind CSS configuration
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
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

## 🔄 **Comparison with Other Tools**

| Feature | API Visualizer | Postman | Insomnia | Thunder Client |
|---------|---------------|---------|----------|----------------|
| **Web-Based** | ✅ | ❌ (Desktop) | ❌ (Desktop) | ✅ (VS Code Extension) |
| **AI Analysis** | ✅ Gemini AI | ❌ | ❌ | ❌ |
| **Collections** | ✅ Advanced | ✅ | ✅ | ✅ |
| **Scripting** | ✅ Pre/Test | ✅ | ✅ | ✅ |
| **Data Runner** | ✅ Iterations | ✅ | ✅ | ✅ |
| **Responsive UI** | ✅ All Devices | ❌ | ❌ | ✅ |
| **Free** | ✅ | ✅ | ✅ | ✅ |
| **Real-time Collaboration** | ❌ | ✅ | ❌ | ❌ |
| **API Mocking** | ❌ | ✅ | ✅ | ❌ |
| **Team Workspaces** | ❌ | ✅ | ✅ | ❌ |

## 🎯 **Use Cases**

- **API Development**: Test and debug REST APIs during development
- **API Documentation**: Understand and document API responses
- **Data Analysis**: Extract insights from API responses with AI
- **Automated Testing**: Create test suites with scripting and data-driven tests
- **Learning APIs**: Explore and understand third-party API structures
- **Debugging**: Troubleshoot API issues with detailed response analysis

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) - The React framework for production
- UI components from [shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible components
- AI powered by [Google Gemini](https://ai.google.dev/) - Advanced AI for API analysis
- Icons by [Lucide](https://lucide.dev/) - Beautiful and consistent icon set
- Inspired by [Postman](https://www.postman.com/) - The gold standard for API testing

## 🗺️ **Roadmap**

### **Phase 1 ✅ COMPLETED**
- Professional API testing interface
- Collections management
- Pre-request and test scripting
- Data-driven testing runner
- Advanced settings and proxy support
- Fully responsive design
- AI-powered response analysis

### **Phase 2 - Upcoming Features**
- **Real-time Collaboration**: Multi-user editing and sharing
- **API Mocking**: Generate mock responses for testing
- **Import/Export**: Postman collection compatibility
- **Performance Monitoring**: Advanced metrics and reporting
- **Team Workspaces**: Organization and project management
- **CI/CD Integration**: Automated API testing in pipelines

### **Phase 3 - Future Enhancements**
- **GraphQL Advanced Support**: Schema exploration and validation
- **WebSocket Testing**: Real-time API testing
- **Load Testing**: Performance and stress testing
- **API Documentation Generation**: Auto-generate docs from tests
- **Mobile App**: Native mobile testing application

## � Contact

- **GitHub**: [@CodewithEvilxd](https://github.com/codewithevilxd)
- **Project Repository**: [https://github.com/CodewithEvilxd/api-visualizer](https://github.com/CodewithEvilxd/api-visualizer)
- **Live Demo**: [https://api-visualizer-xd.vercel.app](https://api-visualizer-xd.vercel.app)
- **Issues**: [Report bugs or request features](https://github.com/CodewithEvilxd/api-visualizer/issues)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by [codewithevilxd](https://github.com/codewithevilxd)**

*Transforming API testing with modern web technologies and AI-powered insights*
