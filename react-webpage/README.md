# React Webpage with Carbon Design System

A modern React web application featuring IBM's Carbon Design System components, including an animated header with AI prompt tiles.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 14.x or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bhavanachemuturi/mcp-labs-testing.git
   cd mcp-labs-testing/react-webpage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all required packages including:
   - React and React DOM
   - Carbon Design System components
   - Carbon Labs components (Animated Header, Processing, Resizer)
   - Tailwind CSS
   - And other necessary dependencies

## 🏃 Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm start
```

The application will automatically open in your default browser at [http://localhost:3000](http://localhost:3000).

- The page will reload when you make changes
- You'll see build errors and lint warnings in the console

### Production Build

Create an optimized production build:

```bash
npm run build
```

This creates a `build` folder with optimized files ready for deployment.

### Testing the Production Build

To test the production build locally:

```bash
npm install -g serve
serve -s build
```

## 📁 Project Structure

```
react-webpage/
├── public/              # Static files
│   └── index.html      # HTML template
├── src/                # Source files
│   ├── App.js          # Main application component
│   ├── App.css         # Application styles
│   ├── index.js        # Application entry point
│   └── index.css       # Global styles
├── config-overrides.js # Webpack configuration overrides
├── package.json        # Project dependencies and scripts
└── .gitignore         # Git ignore rules
```

## 🎨 Features

- **Carbon Design System**: IBM's open-source design system
- **Animated Header**: Dynamic header with smooth animations
- **AI Prompt Tiles**: Interactive tiles for AI-powered features
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-friendly layout

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📦 Key Dependencies

- **React** (^18.3.1) - JavaScript library for building user interfaces
- **@carbon/react** (^1.72.2) - Carbon Design System React components
- **@carbon-labs/react-animated-header** (^0.54.0) - Animated header component
- **tailwindcss** (^3.4.17) - Utility-first CSS framework
- **react-app-rewired** (^2.2.1) - Override Create React App configuration

## 🔧 Configuration

The project uses `config-overrides.js` to customize the webpack configuration without ejecting from Create React App. This allows for:
- Custom webpack configurations
- Integration with Carbon Labs components
- Tailwind CSS setup

## 🚨 Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# On macOS/Linux
PORT=3001 npm start

# On Windows
set PORT=3001 && npm start
```

### Module Not Found
If you encounter module errors:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Clear the cache and rebuild:
```bash
npm run build -- --reset-cache
```

## 📝 License

This project is part of the mcp-labs-testing repository.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For issues and questions, please open an issue in the GitHub repository.