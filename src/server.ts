import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router/index.route";
import cookieParser from "cookie-parser";
import { json } from "body-parser";

const app = express(); // Create express app
app.use(morgan("tiny")); // Log HTTP requests
app.use(
  cors({
    credentials: true,
  })
); // Enable CORS
app.use(json()); // Parse JSON (Requests)
app.use(cookieParser()); // Parse cookies
app.use(router); // Use routers

const port = process.env.PORT || 3000; // Read port from .env or default port is 3000
app.listen(port, () => {
  // Start server
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
