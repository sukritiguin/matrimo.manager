import app from "./app.js";
import { logger } from "./utils/logger.js";
import config from "./config/env.config.js";

try {
  app.listen(config.app.PORT, () => {
    logger.log(`API server is running on port ${config.app.PORT}`);
  });
} catch (error: any) {
  logger.error("Error starting API server:", error);
  process.exit(1);
}
