# FoodSnatch

FoodSnatch is a minimal yet powerful platform to order your favorite meals and help food partners grow with ease. It provides a seamless experience for users to browse and order food, and for food partners to manage their offerings.

## Architecture

The project is divided into two main parts: Backend and Frontend.

### Backend

- **Technologies:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, ImageKit
- **Structure:**
  - `src/app.js`: Express app setup with middleware and routes
  - `src/routes/`: Defines API routes for authentication and food management
  - `src/controllers/`: Contains logic for handling requests (auth.controller.js, food.controller.js)
  - `src/models/`: Mongoose schemas for User, FoodPartner, and Food
  - `src/middlewares/`: Authentication middleware to protect routes
  - `src/services/`: External services integration (e.g., ImageKit for file uploads)
- **Authentication:**
  - Users and Food Partners can register, login, and logout
  - Passwords are hashed using bcrypt
  - JWT tokens are used for session management and stored in cookies
- **Food Management:**
  - Food partners can create food items with video uploads
  - Users can fetch food items to browse

### Frontend

- **Technologies:** React, React Router, Tailwind CSS, Framer Motion, React Three Fiber
- **Structure:**
  - `src/App.jsx`: Main app component rendering routes
  - `src/routes/AppRoutes.jsx`: Defines client-side routes for user and food partner login/register and home page
  - `src/pages/`: Contains React components for different pages (UserLogin, UserRegister, FoodPartnerLogin, FoodPartnerRegister, Home)
- **UI/UX:**
  - Modern and responsive design using Tailwind CSS
  - Animated 3D background on the home page using React Three Fiber
  - Smooth page transitions with Framer Motion
  - Clear navigation and call-to-action buttons for users and food partners

## Running the Project Locally

### Backend

1. Install dependencies:
   ```
   cd backend
   npm install
   ```
2. Create a `.env` file with the following variables:
   ```
   JWT_SECRET=your_jwt_secret
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```
3. Start the server:
   ```
   npm start
   ```
   or with nodemon for development:
   ```
   npx nodemon src/app.js
   ```

### Frontend

1. Install dependencies:
   ```
   cd frontend
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```
3. Open the app in your browser at `http://localhost:3000` (or the port shown in the terminal)

## Dependencies

### Backend

- express
- mongoose
- bcrypt
- jsonwebtoken
- cookie-parser
- multer
- imagekit
- uuid
- dotenv

### Frontend

- react
- react-dom
- react-router-dom
- tailwindcss
- framer-motion
- @react-three/fiber
- @react-three/drei
- lottie-react

## Contribution

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## Contact

Built with ❤️ by the FoodSnatch team.
