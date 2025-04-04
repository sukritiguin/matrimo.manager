import pino from "pino";

const colors = {
  reset: "\x1b[0m",
  gray: "\x1b[90m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

const emojis = {
  log: "📘",
  info: "ℹ️",
  warn: "⚠️",
  error: "❌",
  debug: "🐛",
  verbose: "🔍",
};

export class Logger {
  private logger: pino.Logger;
  private enabled = process.env.NODE_ENV !== "production";

  constructor(private context = "Logger") {
    this.logger = pino({
      level: "debug",
      base: null,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
    });
  }

  private format(
    level: keyof typeof emojis,
    context: string,
    message: string
  ): string {
    const emoji = emojis[level] || "";
    const ctx = `${colors.cyan}[${context}]${colors.reset}`;
    const msgColor =
      level === "error"
        ? colors.red
        : level === "warn"
          ? colors.yellow
          : level === "debug"
            ? colors.magenta
            : level === "verbose"
              ? colors.gray
              : colors.reset;

    return `${emoji} ${ctx} ${msgColor}${message}${colors.reset}`;
  }

  log(message: string, context?: string) {
    if (this.enabled) {
      this.logger.info(this.format("log", context || this.context, message));
    }
  }

  info(message: string, context?: string) {
    if (this.enabled) {
      this.logger.info(this.format("info", context || this.context, message));
    }
  }

  warn(message: string, context?: string) {
    if (this.enabled) {
      this.logger.warn(this.format("warn", context || this.context, message));
    }
  }

  error(message: string, trace?: string, context?: string) {
    if (this.enabled) {
      const formatted = this.format("error", context || this.context, message);
      const output = trace
        ? `${formatted}\n${colors.gray}TRACE: ${trace}${colors.reset}`
        : formatted;
      this.logger.error(output);
    }
  }

  debug(message: string, context?: string) {
    if (this.enabled) {
      this.logger.debug(this.format("debug", context || this.context, message));
    }
  }

  verbose(message: string, context?: string) {
    if (this.enabled) {
      this.logger.trace(
        this.format("verbose", context || this.context, message)
      );
    }
  }

  setContext(ctx: string) {
    this.context = ctx;
  }

  addSubContext(ctx: string) {
    this.context = this.context ? `${this.context}: ${ctx}` : ctx;
  }
}
