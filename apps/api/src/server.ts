import { logger } from "./utils/logger.js";
import { app } from "./app.js";

try {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.log(`API server is running on port ${PORT}`);
  });
} catch (error: any) {
  logger.error("Error starting API server:", error);
  process.exit(1);
}
