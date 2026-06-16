# MálagaEvents

Full-stack web application for discovering and managing events in Málaga, Spain. Users can browse events by category, register, join events and manage their profile. Administrators can create, edit and delete events through the API.

---

## Technologies

**Frontend:**
- Next.js
- React
- CSS3 with custom design system

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt for password encryption

---

## Features

- Browse all events with category filters and pagination
- User registration and login with JWT tokens
- Event detail page with attendee count and join/leave functionality
- User profile with avatar and password update
- Admin panel to create, edit and delete events
- Real event images from Málaga
- Responsive design, mobile first
- In-page notifications

---

## Project Structure

malaga-events/

├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── middleware/
│   ├── router/
│   └── app.js
└── frontend/
└── src/
├── api/
├── components/
└── pages/

## Installation

**Backend:**
```bash
cd backend
npm install
npm run dev
```

Server runs on http://localhost:9000

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

App runs on http://localhost:3000

---

## Environment Variables

Create a `.env` file inside the `backend` folder:

PORT=9000

DATABASE_URL=your_mongodb_atlas_url

TOKEN_SECRET=your_secret_key

## API Endpoints

**Auth:**
- POST `/auth/signup` — Register a new user
- POST `/auth/login` — Login and receive JWT token

**Events:**
- GET `/events` — Get all events (supports category filter and pagination)
- GET `/events/:id` — Get event by ID
- POST `/events` — Create a new event (admin only)
- PATCH `/events/:id` — Update event (admin only)
- DELETE `/events/:id` — Delete event (admin only)
- POST `/events/:id/join` — Join an event (requires token)
- DELETE `/events/:id/leave` — Leave an event (requires token)

**User:**
- GET `/user/profile` — Get current user profile (requires token)
- PATCH `/user/profile` — Update profile avatar (requires token)
- PATCH `/user/password` — Update password (requires token)

---

## Author

Sergio Picon
- GitHub: [@Piconazo](https://github.com/Piconazo)
- Location: Malaga, Spain

---

## License

MIT
