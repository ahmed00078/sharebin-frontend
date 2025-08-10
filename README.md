# ShareBin Frontend

A Next.js frontend for ShareBin - a modern, dark-themed file and text sharing application with expiring links.

## Features

- **Clean Dark UI**: Modern dark theme with Railway purple accents
- **Drag & Drop**: Easy file uploads with visual feedback
- **Text & File Support**: Share text snippets or upload files
- **Expiration Settings**: Choose from 1 hour to 1 week, or never expire
- **One-Click Copy**: Copy share links to clipboard instantly
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Feedback**: Loading states and error handling

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Railway Theme** - Custom purple gradient design system

## Design System

### Color Palette
- **Railway Colors**: Purple gradients (`railway-50` to `railway-950`)
- **Dark Colors**: Various dark shades (`dark-100` to `dark-500`)
- **Gradients**: Custom railway-themed background gradients
- **Shadows**: Railway-branded shadow effects

### Components
- **Gradient Backgrounds**: Dynamic railway-themed gradients
- **Glass Cards**: Backdrop-blur effects with subtle borders
- **Interactive Elements**: Hover states and smooth transitions
- **Icon Integration**: Consistent Lucide React icons throughout

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

For production, update this to your backend API URL.

## Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

4. **Lint the code:**
   ```bash
   npm run lint
   ```

## Project Structure

```
sharebin-frontend/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.js           # Root layout component
│   ├── page.js             # Home page with upload form
│   └── v/
│       └── [id]/
│           └── page.js     # Share viewing page
├── tailwind.config.js      # Tailwind configuration with custom theme
├── postcss.config.js       # PostCSS configuration
├── next.config.js          # Next.js configuration
├── package.json           # Dependencies and scripts
└── railway.toml           # Railway deployment config
```

## Key Features

### Upload Form
- **Text Input**: Large textarea for pasting text content
- **File Upload**: Drag-and-drop file selection with size display
- **Expiration Options**: Dropdown with predefined time options
- **Mutual Exclusivity**: Either text OR file, not both
- **Progress States**: Loading indicators during upload

### Share Display
- **Auto-generated Links**: Short, memorable share URLs
- **Copy to Clipboard**: One-click copying with visual feedback
- **Success Animations**: Smooth transitions and check marks

### Responsive Layout
- **Mobile-First**: Optimized for mobile devices
- **Grid System**: Responsive feature cards
- **Typography**: Scalable text and proper contrast
- **Interactive States**: Hover and focus effects

## Styling

The app uses a custom Tailwind configuration with:

- **Railway brand colors** (purple gradients)
- **Dark theme** as default
- **Custom gradients** for backgrounds and cards
- **Backdrop blur** effects for glassmorphism
- **Custom shadows** with Railway purple tints

## API Integration

The frontend communicates with the ShareBin backend via:

- **POST** requests to create new shares
- **GET** requests to retrieve shared content
- **Error handling** for failed requests
- **Loading states** during API calls

## Deployment

This frontend is configured for deployment on Railway.app with:

- **Automatic builds** from Git repository
- **Environment variable** configuration
- **Static file serving** optimized for production
- **Port configuration** for Railway hosting

## Development

- The app runs on `http://localhost:3000` by default
- Hot reloading enabled in development mode
- Tailwind CSS classes are compiled automatically
- Icons from Lucide React are tree-shaken for optimal bundle size