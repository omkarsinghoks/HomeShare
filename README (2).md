# 🏠 HomeShare - MERN Stack Home Sharing Platform

A full-stack web application similar to Airbnb. Users can register, list homes for rent, and make bookings. This project uses the MERN stack (MongoDB, Express, React, Node.js) and supports image uploads via Cloudinary.

---

## 📌 Features

- User registration and login with JWT authentication
- Role-based access for users and admins
- Home listing with image uploads using Cloudinary
- Booking system with availability checks
- Protected API routes
- Responsive frontend with React and Tailwind CSS

---

## 🧰 Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas
- **Image Hosting**: Cloudinary
- **Authentication**: JWT (JSON Web Token)

---

## 📂 Project Structure

```
HomeShare/
│
├── client/                 # React Frontend
│   └── src/
├── server/                 # Express Backend
│   ├── controllers/
│   ├── models/
│   ├── route/
│   ├── middleware/
│   ├── config/
│   └── uploads/            # optional if using local image uploads
│
├── README.md
└── .env                    # Environment variables
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/omkarsinghoks/HomeShare.git
cd HomeShare
```

---

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=omkar@123

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> Replace the values with your MongoDB Atlas and Cloudinary credentials.

Run the backend:

```bash
npm start
```

Server will run at: `http://localhost:8000`

---

### 3. Setup Frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` folder:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

Run the frontend:

```bash
npm start
```

Frontend will run at: `http://localhost:3000`

---

## 📷 Image Uploads

- Images are uploaded to **Cloudinary** during home listing.
- The Cloudinary URL is saved to MongoDB and used to display the image on the frontend.
- Supported in the `/api/homes` POST route with `multipart/form-data`.

---

## 🔐 API Endpoints

### User APIs

- `POST /api/users/register` - Register a user
- `POST /api/users/login` - Login and get JWT

### Home APIs

- `GET /api/homes` - Get all homes
- `GET /api/homes/:id` - Get home by ID
- `POST /api/homes` - Create a new home (requires Auth)

### Booking APIs

- `POST /api/bookings` - Book a home (requires Auth)

---

## ⚠️ Notes

- CORS should be configured in `server/index.js` to allow requests from frontend origin.
- Ensure Cloudinary credentials are valid and properly set in `.env`.
- For production, frontend can be deployed on Vercel/Netlify and backend on Render.

---

## 🧪 Sample User

```json
{
  "email": "test@example.com",
  "password": "test123"
}
```

---

## 🤝 Contributing

Feel free to fork the repo and submit pull requests. For suggestions or issues, please open a GitHub issue.

---

## 📜 License

MIT License © 2025 [Omkar Singh](https://github.com/omkarsinghoks)