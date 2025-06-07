# SMVITM-WorkBench 🚀

A gamified coding education platform that makes learning programming fun and effective. Progress through levels, earn badges, and master coding skills from HTML/CSS to full-stack development.

## Features ✨

- **Gamified Learning**: Earn points, badges, and unlock new levels
- **Structured Curriculum**: 4 progressive levels from frontend to full-stack
- **Interactive Content**: Quizzes, coding puzzles, and hands-on projects
- **Progress Tracking**: Visual progress indicators and achievement system
- **Modern Tech Stack**: Next.js 14, TypeScript, Supabase, Tailwind CSS

## Learning Path 🎯

### Level 1: Water Master 💧 (Frontend Development)
- HTML5/CSS3 Fundamentals
- JavaScript Essentials
- React Framework

### Level 2: Fire Master 🔥 (Backend Development)
- Node.js & Express
- Databases (MongoDB/MySQL)

### Level 3: Air Master 💨 (Full-Stack Integration)
- Cloud Hosting and CI/CD
- Capstone Project Development

### Level 4: Earth Master 🌍 (Advanced Mastery)
- Evaluation & Filtering
- Advanced System Design

### Final Goal: Space Master 🚀
- Complete all levels + major project submission

## Tech Stack 🛠️

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **State Management**: Zustand
- **UI Components**: Lucide React, React Hot Toast
- **Deployment**: Vercel (recommended)

## Quick Start 🚀

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- Supabase account

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd smvitm-workbench
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up Database

1. In your Supabase dashboard, go to the SQL Editor
2. Run the schema creation script from `database/schema.sql`
3. Run the seed data script from `database/seed.sql`

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Setup 📊

The application uses Supabase PostgreSQL with the following main tables:

- `users` - User profiles and progress
- `levels` - Learning levels (Water, Fire, Air, Earth Master)
- `phases` - Sub-phases within each level
- `quizzes` - Quiz questions and answers
- `puzzles` - Coding challenges
- `projects` - Project assignments
- `user_progress` - Progress tracking
- `badges` - Achievement system
- `user_badges` - User achievements

## Project Structure 📁

```
src/
├── app/                    # Next.js app router
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── AuthModal.tsx      # Authentication modal
│   ├── LandingPage.tsx    # Landing page component
│   └── LoadingSpinner.tsx # Loading component
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication context
├── lib/                   # Utilities and configurations
│   └── supabase.ts        # Supabase client and types
└── store/                 # State management
    └── progressStore.ts   # Progress tracking store
```

## Development 💻

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Level/Phase**: Update the database seed data and level components
2. **New Quiz/Puzzle**: Add to the respective database tables
3. **New Badge**: Define in badges table with requirements
4. **UI Components**: Add to the components directory with TypeScript

## Deployment 🚀

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

If you have any questions or need help setting up the project:

1. Check the [Issues](https://github.com/your-username/smvitm-workbench/issues) page
2. Create a new issue if your problem isn't already addressed
3. Join our community discussions

---

**Happy Coding! 🎉**

Start your journey to become a CodeMaster today!
