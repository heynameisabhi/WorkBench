# SMVITM - WorkBench

A modern, full-stack web application built with Next.js, TypeScript, and Supabase, designed to provide an interactive learning platform for coding education.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Real-time Database**: Powered by Supabase for seamless data management
- **Beautiful UI**: Enhanced with Framer Motion for smooth animations
- **State Management**: Efficient state handling with Zustand
- **Type Safety**: Full TypeScript support for robust development
- **Responsive Design**: Tailwind CSS for modern, responsive layouts
- **Toast Notifications**: User-friendly notifications with react-hot-toast
- **Authentication**: Secure user authentication with Supabase Auth
- **Progress Tracking**: Real-time progress tracking and achievements
- **Interactive Learning**: Gamified learning experience with levels and badges

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15.3.3
- **UI Library**: React 19
- **Language**: TypeScript
- **Database**: Supabase
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- npm or yarn
- Git

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd codemaster-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
codemaster-academy/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── AuthModal.tsx      # Authentication modal
│   │   ├── LandingPage.tsx    # Landing page component
│   │   └── LoadingSpinner.tsx # Loading component
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx    # Authentication context
│   ├── lib/                   # Utilities and configurations
│   │   └── supabase.ts        # Supabase client and types
│   └── store/                 # State management
│       └── progressStore.ts   # Progress tracking store
├── public/                    # Static files
├── database/                  # Database related files
├── .next/                     # Next.js build output
├── node_modules/              # Dependencies
├── package.json               # Project configuration
├── tsconfig.json              # TypeScript configuration
├── next.config.ts             # Next.js configuration
└── README.md                  # Project documentation
```

## 📱 Pages and Components

### Main Pages

1. **Landing Page** (`src/app/page.tsx`)
   - Entry point of the application
   - Handles authentication state
   - Redirects authenticated users to dashboard
   - Shows `LandingPage` component for non-authenticated users

2. **Dashboard Page** (`src/app/dashboard/page.tsx`)
   - Protected route requiring authentication
   - Displays user's learning progress
   - Features:
     - Welcome section with user info
     - Progress overview
     - Level cards
     - Badge showcase
     - Recent activity feed

### Core Components

1. **Authentication**
   - `AuthModal.tsx`: Handles user authentication
   - `AuthContext.tsx`: Manages authentication state

2. **Dashboard Components**
   - `DashboardHeader`: Navigation and user info
   - `ProgressOverview`: Learning progress visualization
   - `LevelCards`: Display of learning levels
   - `RecentActivity`: User's recent actions
   - `BadgeShowcase`: Achievement badges display

3. **UI Components**
   - `LoadingSpinner.tsx`: Loading state indicator
   - `LandingPage.tsx`: Main landing page UI

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 🔧 Development

The project uses several modern development tools and practices:

- **TypeScript**: For type safety and better developer experience
- **ESLint**: For code linting and maintaining code quality
- **Tailwind CSS**: For utility-first styling
- **Turbopack**: For faster development builds

## 📦 Dependencies

### Production Dependencies
- @supabase/ssr
- @supabase/supabase-js
- framer-motion
- lucide-react
- next
- react
- react-dom
- react-hot-toast
- uuid
- zustand

### Development Dependencies
- @types/node
- @types/react
- @types/react-dom
- eslint
- tailwindcss
- typescript

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- All contributors who have helped shape this project
