﻿# XpertBuddy-Blog-Platform-Frontend

XpertBuddy is a platform designed to connect students with teachers, fostering networking, engagement, and motivation among students. The platform allows students to find XpertBuddy based on their interests, while educators can reach out to a community of enthusiastic learners.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)

---

## Project Overview

XpertBuddy is your trusted platform for discovering and sharing insightful blog posts. Whether you're seeking expert advice, exploring new topics, or showcasing your knowledge, XpertBuddy provides a rich collection of blogs and a community-driven space to support your learning and growth

---

## Tech Stack

- **Frontend**: React, Redux, Javascript, TailwindCSS, Shadcn UI
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Cloud**: DigitalOcean for hosting
- **Authentication**: JSON Web Tokens (JWT)
- **Others**: Git, Github,axios
---

## Setup Instructions

### Prerequisites

- Node.js
- React
- Redux
- TailwindCSS
- MongoDB
- Git

### Installation

1. **Clone Frontend the repository**
   ```bash
   git clone https://github.com/vkas9/XpertBuddy-Blog-Platform-Frontend.git
   cd XpertBuddy-Blog-Platform-Frontend
   ```
   **Clone Backend the repository**
   ```bash
   git clone https://github.com/vkas9/XpertBuddy-Blog-Platform-Backend.git
   cd XpertBuddy-Blog-Platform-Backend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:

   ```env
   VITE_BASE_URL="http://localhost:8087"
   VITE_TOKEN="Uat"
   VITE_USER="user_detail"
   ```

4. **Run database migrations**
   Use a migration tool like Sequelize or Prisma if applicable, or directly initialize the database schema in MongoDB.

5. **Start the server**
   ```bash
   npm run dev
   ```

6. **Frontend URL**: `http://localhost:3000`  
   **Backend URL**: `http://localhost:8087`

---

## API Documentation

### User Authentication

- **POST /api/auth/signup** - Register a new user
- **POST /api/auth/login** - Login an existing user

### Forgot Password & Verify Password

- **POST /api/forgotPassword** - Use to Reset Password
- **POST /api/verifyForgotPasswordOTP** - Use of Verify OTP for Resetting

### Fetch Blogs

- **GET /api/blog?blogId=${blogId}** - Get Single Post based on blog Id
- **GET /api/blog/allblog** - Get All Blogs

### Create Blog and Update Blog

- **POST /api/blog/addblog** - Create a New Blog
- **PUT /api/blog/updateblog?blogId=${id}** - Update the Blog using on blog Id

### Example Requests

Sample `POST /api/auth/signup` Request:

```
await axios.post(
        `${BASE_URL}/api/auth/signup`,
        {
          first_name: data.FirstName,
          last_name: data.LastName,
          email: data.Email,
          password: data.Password,
        },
        { withCredentials: true }
      );
```

### Error Handling

Each API returns status codes with relevant messages:
- `200 OK` - Success
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication error
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server-side error


## Screenshots

**Screenshots:**



![screenshot-1731705279360](https://github.com/user-attachments/assets/2461ef45-b9e1-4d1c-ab06-f0317536853e)
![screenshot-1731705163440](https://github.com/user-attachments/assets/e961e37a-fe03-4b4f-ad0c-5d7ab23ba1d0)
![screenshot-1731705194472](https://github.com/user-attachments/assets/d57fc942-2749-44d3-b2fb-34805940e60b)
![screenshot-1731705210071](https://github.com/user-attachments/assets/3692e131-4932-4c2d-9de5-3d1259e88fb2)
![screenshot-1731705223546](https://github.com/user-attachments/assets/e68ddd20-1b31-47d3-b066-80471cc646c6)
![screenshot-1731705252663](https://github.com/user-attachments/assets/952499fd-c166-4eee-a78d-cc217e2a60fc)
![screenshot-1731705267373](https://github.com/user-attachments/assets/32b3f6f5-4561-4f6e-ab53-6e68921321d6)

---

## Future Improvements
  - **Interactive Comments Section**: Enhance user engagement with threaded comments and upvote/downvote features.
  - **Notification System**: Add notifications to alert users about new blog posts, replies to their comments, and updates from their favorite authors.
  - **Content Collaboration Tools**: Allow multiple authors to co-write and edit blog posts in real time.
  - **User Analytics Dashboard**: Provide detailed insights for authors on post performance, including views, likes, and shares.
  - **Multimedia Integration**: Support for embedding videos, podcasts, and interactive media in blog posts to enrich the content experience.
  - **Mobile App Integration**: Launch a mobile app for seamless access to blog posts and user interactions on the go.


---

### License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Feel free to suggest any additional features or ask questions in the repository's issues section.
