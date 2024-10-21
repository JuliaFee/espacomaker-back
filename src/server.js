import express from "express";
import { config } from "dotenv";
import { router } from "./routes/index.routes.js";
import cors from "cors"; // Use 'import' instead of 'require'

config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors()); // Certifique-se que isso vem antes do router
app.use(router);

app.listen(port, () =>
  console.log(`⚡ Server started on http://localhost:${port}`)
);