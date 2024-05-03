import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router/index.route";

const app = express();
app.use(morgan("tiny"));
app.use(cors());
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
