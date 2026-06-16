# 🌴 MálagaEvents

A full-stack web application for discovering and managing events in Málaga, Spain.

## 🚀 Technologies

**Frontend:**
- Next.js 16
- React
- CSS3

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt

## ✨ Features

- Browse and filter events by category
- User registration and login with JWT
- Event detail with attendee count
- Join and leave events
- User profile
- Admin panel to create, edit and delete events
- Pagination
- Mobile first responsive design

## 📦 Installation

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file in the backend folder:
PORT=9000

DATABASE_URL=your_mongodb_atlas_url

TOKEN_SECRET=your_secret_key

## 📡 API Endpoints

**Auth:**
- POST `/auth/signup` — Register user
- POST `/auth/login` — Login user

**Events:**
- GET `/events` — Get all events
- GET `/events/:id` — Get event by ID
- POST `/events` — Create event (admin)
- PATCH `/events/:id` — Update event (admin)
- DELETE `/events/:id` — Delete event (admin)
- POST `/events/:id/join` — Join event
- DELETE `/events/:id/leave` — Leave event

**User:**
- GET `/user/profile` — Get profile
- PATCH `/user/profile` — Update profile
- PATCH `/user/password` — Update password

## 👨‍💻 Author

**Sergio Picón**
- GitHub: [@Piconazo](https://github.com/Piconazo)
- Location: Málaga, Spain

## 📄 License

MIT
