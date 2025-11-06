# URL Shortener

This is a full-stack URL shortener application with a modern, responsive frontend and a robust backend. It allows users to shorten long URLs, with or without an account. Registered users can also track their shortened URLs.

## Features

- **URL Shortening:** Quickly shorten long URLs.
- **AI-Powered Shortening:** Use AI to generate custom short URLs.
- **User Authentication:** Sign up and log in to manage your links.
- **Link Management:** View all your shortened URLs in one place.
- **Redirection:** Shortened URLs redirect to the original URL.
- **Responsive Design:** Works on all devices.

## Tech Stack

**Frontend:**

- React
- Vite
- React Router
- Tailwind CSS
- Axios
- Tanstack Query
- Framer Motion

**Backend:**

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- JWT for authentication
- bcryptjs for password hashing
- Nanoid for generating short URLs

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm
- MongoDB instance
- Redis instance

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/shortify.git
    cd url-shortener
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

### Configuration

1.  **Backend:**
    - Create a `.env` file in the `backend` directory and add the following environment variables:
      ```
      MONGO_URI=<your_mongodb_uri>
      REDIS_HOST=<your_redis_host>
      REDIS_PORT=<your_redis_port>
      JWT_SECRET=<your_jwt_secret>
      ```

2.  **Frontend:**
    - Create a `.env` file in the `frontend` directory and add the following environment variable:
      ```
      VITE_PUBLIC_API_URL=http://localhost:3000
      ```

### Running the application

1.  **Start the backend server:**

    ```bash
    cd backend
    npm start
    ```

2.  **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/auth/register` | Register a new user          |
| POST   | `/api/auth/login`    | Login a user                 |
| POST   | `/api/auth/logout`   | Logout a user                |
| GET    | `/api/auth/me`       | Get the current user         |
| POST   | `/api/create`        | Create a short URL           |
| POST   | `/api/create/ai`     | Create a short URL with AI   |
| POST   | `/api/user/urls`     | Get all URLs for a user      |
| GET    | `/:id`               | Redirect to the original URL |

## Folder Structure

```
.
├── backend/
│   ├── app.js
│   ├── package.json
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── daos/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       └── services/
└── frontend/
    ├── index.html
    ├── package.json
    └── src/
        ├── api/
        ├── components/
        ├── pages/
        ├── routes/
        └── utils/
```
