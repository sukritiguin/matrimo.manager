import express from "express";
import { logger } from "./utils/logger.js";

const app: express.Express = express();

logger.log("Starting API server...");

app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(express.static("public"));

export { app };
