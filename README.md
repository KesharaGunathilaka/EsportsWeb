# 🎮 EsportsWeb

A full-stack esports web application built with the MERN stack, featuring comprehensive content management for games, esports events, and blogs. The platform provides an engaging user experience for esports enthusiasts with authentication, content creation, and dynamic data management.

![EsportsWeb Banner](https://github.com/user-attachments/assets/5800084f-fa71-4dc7-99f2-0e0633a41457)

## 🌐 Live Demo

Visit the live website: **[kgc.onrender.com](https://kgc.onrender.com)**

## ✨ Features

### 🏠 Core Features
- **Home Page**: Dynamic landing page showcasing featured content
- **Games Section**: Browse and explore various gaming titles
- **Esports Events**: Discover and track esports tournaments and competitions
- **Blog Platform**: Read and publish gaming-related articles and news
- **About Us & Contact**: Company information and contact functionality

### 🔐 Authentication & Authorization
- User registration and login system
- JWT-based authentication
- Protected routes for admin/content creator actions
- Secure password hashing with bcrypt
- Firebase integration for enhanced authentication

### 📝 Content Management
- Create, read, update, and delete (CRUD) operations for:
  - Games
  - Esports events
  - Blog posts
- Role-based access control for content creation
- Rich content display with detailed views

### 🎨 User Experience
- Responsive design with Tailwind CSS
- Modern UI components with Material-UI and NextUI
- Smooth animations with Framer Motion
- Toast notifications for user feedback
- Pagination for content browsing
- Scroll-to-top functionality
- 404 Not Found page

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.2.0
- **Routing**: React Router DOM 6.23.1
- **Styling**: 
  - Tailwind CSS 3.4.14
  - Material-UI 5.15.19
  - NextUI 2.4.1
  - Bootstrap 5.3.3
- **State & Data**: 
  - Axios 1.7.2
  - JWT Decode 4.0.0
- **UI Enhancements**:
  - Framer Motion 11.2.10
  - SweetAlert2 11.14.3
  - React Toastify 10.0.5
  - Swiper 11.1.4
- **Authentication**: Firebase 10.13.2

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.19.2
- **Database**: MongoDB with Mongoose 8.8.3
- **Authentication**: 
  - JSON Web Token (JWT) 9.0.2
  - bcrypt 5.1.1
- **Middleware**:
  - CORS 2.8.5
  - Express Async Handler 1.2.0
- **Environment**: dotenv 16.4.5

## 📁 Project Structure

```
EsportsWeb/
├── back/                      # Backend server
│   ├── configuration/         # Configuration files (JWT)
│   ├── controllers/          # Route controllers
│   │   ├── blogController.js
│   │   ├── esportController.js
│   │   ├── gameController.js
│   │   ├── loginController.js
│   │   └── userController.js
│   ├── middleware/           # Custom middleware
│   │   └── errorMiddleware.js
│   ├── models/               # MongoDB models
│   │   ├── blogs.js
│   │   ├── esports.js
│   │   ├── games.js
│   │   └── users.js
│   ├── routes/               # API routes
│   │   ├── blogsRoute.js
│   │   ├── esportsRoute.js
│   │   ├── gamesRoute.js
│   │   ├── loginRoute.js
│   │   └── usersRoute.js
│   ├── services/             # Business logic
│   │   └── login.js
│   ├── utils/                # Utility functions
│   │   ├── authMiddleware.js
│   │   └── jwtUtils.js
│   ├── server.js             # Entry point
│   └── package.json
│
└── front/                     # Frontend application
    ├── public/               # Static assets
    ├── src/
    │   ├── assets/           # Images, icons, etc.
    │   ├── Components/       # React components
    │   │   ├── Blogs/
    │   │   ├── Esports/
    │   │   ├── FooterC/
    │   │   ├── Games/
    │   │   ├── HeaderC/
    │   │   └── Icons/
    │   ├── Pages/            # Page components
    │   │   ├── Home.jsx
    │   │   ├── Games.jsx
    │   │   ├── Esports.jsx
    │   │   ├── Blogs.jsx
    │   │   ├── SignIn.jsx
    │   │   ├── SignUp.jsx
    │   │   ├── ContactUs.jsx
    │   │   ├── AboutUs.jsx
    │   │   └── NotFound.jsx
    │   ├── Utils/            # Utility components
    │   │   ├── ProtectedRoutes.jsx
    │   │   └── ScrollToTop.jsx
    │   ├── App.jsx           # Main app component
    │   ├── main.jsx          # Entry point
    │   ├── config.js         # Configuration
    │   └── firebase.js       # Firebase setup
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database
- Firebase account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KesharaGunathilaka/EsportsWeb.git
   cd EsportsWeb
   ```

2. **Backend Setup**
   ```bash
   cd back
   npm install
   ```

3. **Create backend environment file**
   
   Copy `.env.example` to `.env` in the `back` directory and update with your values:
   ```bash
   cp .env.example .env
   ```
   
   Edit `back/.env`:
   ```env
   MONGO_URL=your_mongodb_connection_string
   PORT=3000
   FRONTEND=http://localhost:5173
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Frontend Setup**
   ```bash
   cd ../front
   npm install
   ```

5. **Create frontend environment file**
   
   Copy `.env.example` to `.env` in the `front` directory and update with your values:
   ```bash
   cp .env.example .env
   ```
   
   Edit `front/.env`:
   ```env
   VITE_BACKEND_URL=https://esportsweb.onrender.com
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd back
   npm run dev      # Development mode with nodemon
   # or
   npm run serve    # Production mode
   ```

2. **Start the frontend development server**
   ```bash
   cd front
   npm run dev
   ```

3. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

### Building for Production

**Frontend**
```bash
cd front
npm run build
npm run preview
```

## 🔑 Environment Variables

### Backend (.env)
```env
MONGO_URL=           # MongoDB connection string
PORT=                # Server port (default: 3000)
FRONTEND=            # Frontend URL for CORS
JWT_SECRET=          # Secret key for JWT tokens
```

> **Tip**: Copy `back/.env.example` to `back/.env` and fill in your actual values

### Frontend (.env)
```env
VITE_BACKEND_URL=                     # Backend API URL
VITE_FIREBASE_API_KEY=                # Firebase API key
VITE_FIREBASE_AUTH_DOMAIN=            # Firebase auth domain
VITE_FIREBASE_PROJECT_ID=             # Firebase project ID
VITE_FIREBASE_STORAGE_BUCKET=         # Firebase storage bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=    # Firebase messaging sender ID
VITE_FIREBASE_APP_ID=                 # Firebase app ID
```

> **Tip**: Copy `front/.env.example` to `front/.env` and fill in your actual values

### Environment Files
- **`.env`** - Local environment variables (not committed to git)
- **`.env.example`** - Template for environment variables (safe to commit)

## 📡 API Routes

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/users` - User registration

### Games
- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get game by ID
- `POST /api/games` - Create game (Protected)
- `PUT /api/games/:id` - Update game (Protected)
- `DELETE /api/games/:id` - Delete game (Protected)

### Esports
- `GET /api/esports` - Get all esports events
- `GET /api/esports/:id` - Get event by ID
- `POST /api/esports` - Create event (Protected)
- `PUT /api/esports/:id` - Update event (Protected)
- `DELETE /api/esports/:id` - Delete event (Protected)

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

**Keshara Gunathilaka**
- GitHub: [@KesharaGunathilaka](https://github.com/KesharaGunathilaka)

## 🙏 Acknowledgments

- MongoDB for the database solution
- Firebase for authentication services
- Render for hosting
- All open-source libraries used in this project

---

⭐ If you found this project helpful, please give it a star!
