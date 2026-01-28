# JavaScript Module Structure

This directory contains the modularized React application code.

## Directory Structure

```
js/
├── main.js                    # Entry point - initializes React app
├── config.js                  # Configuration constants (slides, features)
├── components/
│   ├── App.js                 # Main App component
│   ├── animations/
│   │   ├── BlurText.js        # BlurText animation component
│   │   └── FadeContent.js     # FadeContent animation component
│   ├── ReleaseNotes.js        # Version release notes component
│   ├── ScreenshotCarousel.js  # Screenshot carousel component
│   ├── FeatureCard.js         # Feature card component
│   ├── Lightbox.js            # Image lightbox component
│   ├── CreditsModal.js        # Credits modal component
│   └── BmcButton.js           # Buy Me a Coffee button component
└── utils/
    └── hooks.js               # Custom React hooks
```

## Module Organization

### Entry Point
- **main.js**: Initializes React, registers GSAP plugins, and renders the App component

### Configuration
- **config.js**: Contains constants like slide data and feature information

### Components
- **App.js**: Main application component that orchestrates all other components
- **animations/**: React Bits animation components (BlurText, FadeContent)
- **UI Components**: All other React components for the download page

### Utilities
- **hooks.js**: Custom React hooks (usePrefersReducedMotion, useVersionInfo)

## Usage

The application is loaded via ES modules in `index.html`:

```html
<script type="module" src="./js/main.js"></script>
```

All modules use ES6 imports/exports and are compatible with modern browsers that support ES modules.
