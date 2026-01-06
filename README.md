# 🔗 LinkShare

> **One Link for Everything You Are**

A modern, full-stack link-in-bio platform that helps creators, entrepreneurs, and brands share all their important links through a single, beautiful page. Built with React, Node.js, Express, and PostgreSQL.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://linkshare-mocha.vercel.app/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)


## ✨ Features

### 🎨 **Beautiful & Customizable**
- Fully responsive design optimized for all devices
- Custom theme colors and branding
- Profile customization (avatar, bio, display name)
- Font Awesome social media icons (30+ platforms)
- Clean, modern UI with smooth animations

### 🔗 **Powerful Link Management**
- Unlimited links with no restrictions
- Drag-and-drop reordering
- Enable/disable links on the fly
- Custom icons and thumbnails
- Link descriptions and metadata
- Platform-specific icons (GitHub, Instagram, LinkedIn, etc.)

### 📊 **Analytics & Insights**
- Real-time click tracking
- Profile view counter
- Link performance metrics
- 30-day analytics overview
- Click-through rate (CTR) tracking

### 🔐 **Secure & Reliable**
- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting and security headers
- Input validation and sanitization
- Protected API routes

### 🚀 **Developer-Friendly**
- RESTful API design
- Clean code architecture
- Comprehensive error handling
- Easy deployment
- Environment-based configuration

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **@dnd-kit** - Drag and drop functionality
- **React Hot Toast** - Beautiful notifications
- **Lucide React** - Icon library
- **Font Awesome** - Social media icons
- **Vite** - Lightning-fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Prisma ORM** - Database toolkit
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image hosting & optimization
- **Multer** - File upload handling
- **Helmet** - Security middleware
- **Express Rate Limit** - Rate limiting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/linkshare.git
cd linkshare
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/linkshare?schema=public"

# JWT Secrets (use strong random strings)
JWT_ACCESS_SECRET=your-super-secret-access-key-min-32-characters-long
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-characters-long

# Cloudinary (get free account at cloudinary.com)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

Run database migrations:
```bash
npx prisma migrate dev
npx prisma generate
```

Start backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
VITE_PUBLIC_URL=http://localhost:5173
```

Start frontend development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Open Your Browser

Visit `http://localhost:5173` and start building your LinkShare page! 🎉

## 📁 Project Structure
```
linkshare/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Helper functions
│   │   ├── app.js            # Express app setup
│   │   └── server.js         # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── migrations/       # Database migrations
│   ├── .env.example          # Environment variables template
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/       # React components
    │   │   ├── auth/         # Authentication components
    │   │   ├── common/       # Reusable components
    │   │   ├── dashboard/    # Dashboard components
    │   │   ├── links/        # Link management
    │   │   ├── profile/      # Profile components
    │   │   └── public-profile/ # Public profile view
    │   ├── contexts/         # React Context providers
    │   ├── hooks/            # Custom React hooks
    │   ├── pages/            # Page components
    │   ├── services/         # API services
    │   ├── utils/            # Utility functions
    │   ├── App.jsx           # Main App component
    │   └── main.jsx          # React entry point
    ├── .env.example          # Environment variables template
    └── package.json
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login user
POST   /api/auth/refresh           Refresh access token
GET    /api/auth/me                Get current user [Protected]
```

### Profile
```
GET    /api/profile                Get user profile [Protected]
PUT    /api/profile                Update profile [Protected]
POST   /api/profile/avatar         Upload avatar [Protected]
DELETE /api/profile/avatar         Delete avatar [Protected]
GET    /api/profile/availability/:username  Check username availability
```

### Links
```
GET    /api/links                  Get all links [Protected]
POST   /api/links                  Create link [Protected]
PUT    /api/links/:id              Update link [Protected]
DELETE /api/links/:id              Delete link [Protected]
POST   /api/links/:id/icon         Upload link icon [Protected]
PUT    /api/links/reorder          Reorder links [Protected]
PUT    /api/links/:id/toggle       Toggle link active status [Protected]
```

### Public
```
GET    /api/public/:username       Get public profile
POST   /api/public/:username/links/:linkId/click  Track link click
```

### Analytics
```
GET    /api/analytics/overview     Get analytics overview [Protected]
GET    /api/analytics/links        Get link performance [Protected]
```

## 🌐 Deployment

### Backend (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`
4. Add environment variables from `.env.example`
5. Create a PostgreSQL database on Render or use [Neon](https://neon.tech)
6. Run migrations: `npx prisma migrate deploy`

### Frontend (Vercel)

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variables:
```
   VITE_API_URL=https://your-backend-url.com/api
   VITE_PUBLIC_URL=https://your-frontend-url.com
```
5. Add redirect rule in `vercel.json`:
```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
```

### Frontend (Netlify Alternative)

Create `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🎨 Customization

### Add More Social Platforms

Edit `frontend/src/utils/platforms.js`:
```javascript
export const SOCIAL_PLATFORMS = [
  { id: 'yourplatform', name: 'Your Platform', icon: 'fa-brands fa-youricon', color: '#HEXCOLOR' },
  // ... existing platforms
];
```

### Change Theme Colors

Edit `frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


