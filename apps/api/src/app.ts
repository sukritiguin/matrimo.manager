import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/env.config.js";

const app: express.Express = express();

// Middlewares
app.use(cors({ origin: config.app.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());

app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(express.static("public"));

// Routes
import healthCheckRoute from "./routes/healthCheck.routes.js";

app.use("/healthy", healthCheckRoute);

// Error handle
import { errorConverter, errorHandler, notFound } from "@matrimo/lib/api";

app.use(notFound);
app.use(errorConverter);
app.use(errorHandler);

export default app;
