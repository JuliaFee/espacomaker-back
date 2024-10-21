import express from "express";
import { config } from "dotenv";
import { router } from "./routes/index.routes.js";
import cors from "cors";

config();

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () =>
  console.log(`⚡ Server started on http://localhost:${port}`)
);
