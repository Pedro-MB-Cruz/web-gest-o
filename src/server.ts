import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router/index.route";
import cookieParser from "cookie-parser";
import session from "express-session";
import { json } from "body-parser";

declare module "express-session" {
  interface SessionData {
    logged_in: boolean;
    user: {
      id: number;
      username: string;
      admin: boolean;
    };
  }
}

const app = express(); // Create express app
app.use(morgan("tiny")); // Log HTTP requests
app.use(cors()); // Enable CORS
app.use(json()); // Parse JSON (Requests)
app.use(cookieParser()); // Parse cookies
const sess = {
  secret: process.env.SESSION_SECRET || "secret", // Secret key for session
  cookie: {
    secure: false, // HTTP only (true for HTTPS)
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  },
  resave: false, // Save session only if it's modified
  saveUninitialized: true, // Create session if it's new
};
app.use(session(sess)); // Enable session
app.use(router); // Use routers

const port = process.env.PORT || 3000; // Read port from .env or default port is 3000
app.listen(port, () => {
  // Start server
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
