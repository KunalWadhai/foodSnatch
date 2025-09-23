
# FoodSnatch

FoodSnatch is a modern fullstack web application that connects food lovers with food partners (restaurants, cafes, etc.) through an engaging, mobile-first video experience inspired by Instagram Reels. Users can discover, save, and interact with food videos, while food partners can showcase their offerings and manage their presence.

---

## Features

### For Users
- **Reels Feed:** Scroll through immersive, full-screen food videos (like Instagram Reels).
- **Save & Like:** Save favorite food reels and like videos.
- **Visit Store:** Instantly visit the food partner’s store from each reel.
- **User Authentication:** Register and login securely.
- **Profile & Saved:** View and manage saved food reels.
- **Responsive UI:** Optimized for mobile (Android/iOS) and desktop.

### For Food Partners
- **Partner Authentication:** Register and login as a food partner.
- **Upload Videos:** Showcase food items via short videos.
- **Store Management:** Manage food offerings and interact with users.

### General
- **Light/Dark Theme:** Seamless theme adapts to system settings.
- **Minimal, Modern Design:** Built with Tailwind CSS for a clean look.
- **Secure Backend:** Node.js/Express API with MongoDB Atlas.
- **Cloud-Ready:** Easily deployable on Render, supports cloud storage for videos.

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Lucide Icons
- **Backend:** Node.js, Express, Axios
- **Database:** MongoDB Atlas (cloud)
- **Video Storage:** Cloud storage (e.g., AWS S3, Google Cloud Storage)
- **Deployment:** Render (HTTPS by default)
- **Authentication:** JWT, secure cookies

---

## Project Structure

```
foodSnatch/
├── backend/           # Node.js/Express API
│   └── ...            # Controllers, routes, models, etc.
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── pages/     # Auth, Reels, Saved, Home, etc.
│   │   ├── components/
│   │   └── App.jsx
│   ├── public/
│   └── tailwind.config.js
└── README.md
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/foodSnatch.git
cd foodSnatch
```

### 2. Setup Backend

- Configure your MongoDB Atlas connection string in backend environment variables.
- Install dependencies and start the server:

```bash
cd backend
npm install
npm start
```

### 3. Setup Frontend

- Install dependencies and start the development server:

```bash
cd ../frontend
npm install
npm run dev
```

### 4. Environment Variables

- Set up `.env` files for both frontend and backend as needed (API URLs, DB connection, JWT secrets, cloud storage keys).

---

## Deployment

FoodSnatch is designed for easy deployment on [Render](https://render.com):

- **Backend:** Deploy as a Render Web Service (HTTPS enabled).
- **Frontend:** Deploy as a Render Static Site (HTTPS enabled).
- **Database:** Use MongoDB Atlas.
- **Video Storage:** Use cloud storage (S3, GCS, etc.) for video files.

See [Render Deployment Guide](https://render.com/docs/deploy-node-express) for details.

---

## Screenshots

| Reels Feed (Mobile) | Saved Foods | Partner Login |
|---------------------|-------------|--------------|
| ![Reels](screenshots/reels.png) | ![Saved](screenshots/saved.png) | ![Partner Login](screenshots/partner-login.png) |

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

MIT

---

## Acknowledgements

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Render](https://render.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

**FoodSnatch – Discover food, one reel at a time!**
