# DevTinder 🔥

A developer-focused social networking platform that helps developers connect with other developers based on their skills and interests.

## Features

- 👤 User authentication (signup/login)
- 👤 Profile management with photo, skills, and bio
- 💌 Connection request system (send/accept/reject)
- 🔍 Developer feed with potential connections
- 🤝 Connection management
- 🔒 Secure password handling with bcrypt
- 🍪 JWT-based authentication with cookies

## Tech Stack

### Frontend
- ⚛️ React (v18) with Vite
- 🎨 TailwindCSS + DaisyUI for styling
- 📦 Redux Toolkit for state management
- 🛣️ React Router for navigation
- 🔄 Axios for API calls

### Backend
- 🟢 Node.js + Express.js
- 📦 MongoDB with Mongoose ODM
- 🔐 JWT for authentication
- 🔒 bcrypt for password hashing
- ✅ validator.js for data validation

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB account
- Git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd devTinder
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

4. Configure Environment Variables
- Create a .env file in the backend directory
- Add your MongoDB connection string and JWT secret

5. Start the Development Servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

The frontend will be available at http://localhost:5173
The backend API will be running at http://localhost:7777

## API Endpoints

### Authentication
- POST `/signup` - Register new user
- POST `/login` - User login
- POST `/logout` - User logout

### Profile
- GET `/profile/view` - View user profile
- PUT `/profile/edit` - Edit user profile

### Connections
- GET `/feed` - Get potential connections
- GET `/user/connections/match` - Get matched connections
- GET `/user/requests/received` - Get received connection requests
- POST `/request/send/:status/:toUserId` - Send connection request
- POST `/request/review/:status/:requestId` - Review connection request

## Features in Detail

### User Profile
- Basic info (name, email)
- Profile picture
- Age and gender
- About section
- Skills list

### Connection System
- View potential connections in feed
- Send connection requests
- Accept/reject received requests
- View established connections

### Security Features
- Password hashing
- JWT token authentication
- Protected routes
- Input validation

## Contributing

Feel free to open issues and pull requests for any improvements.

## License

ISC

## Author

Sachin Jadhav

Made with ❤️