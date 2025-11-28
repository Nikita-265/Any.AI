# any.AI - Build Anything with AI

A powerful AI-powered development platform that transforms your ideas into fully functional applications.

![any.AI](https://img.shields.io/badge/any.AI-Build%20Anything-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-green)

## Features

- 🔐 **Authentication** - Google OAuth + Email/Password with NextAuth.js
- 💬 **Chat Interface** - Interactive AI chat for building applications
- 📁 **Project Management** - Create, save, and manage multiple projects
- 🎨 **Beautiful UI** - Dark-themed, modern design with smooth animations
- 🚀 **Deployment Ready** - Optimized for Vercel deployment
- ⚡ **Rate Limiting** - Protection against API abuse

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials (for Google sign-in)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/any-ai.git
   cd any-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/anyai?schema=public"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
any-ai/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Dashboard routes (protected)
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── chat/             # Chat-related components
│   ├── landing/          # Landing page components
│   ├── project/          # Project-related components
│   ├── sidebar/          # Sidebar navigation
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Prisma client
│   ├── rate-limit.ts     # Rate limiting logic
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema
│   └── schema.prisma
├── types/                # TypeScript types
└── middleware.ts         # Auth middleware
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials → Create Credentials → OAuth Client ID
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
7. Copy the Client ID and Client Secret to your `.env` file

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel settings
4. Deploy!

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-a-secure-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## API Endpoints

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get a specific project
- `PATCH /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Messages
- `GET /api/projects/:id/messages` - Get project messages
- `POST /api/projects/:id/messages` - Send a message

### User
- `GET /api/user/profile` - Get user profile
- `PATCH /api/user/profile` - Update user profile

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

---

Built with ❤️ using Next.js and AI

