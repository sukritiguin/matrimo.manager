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

type LogLevel = keyof typeof emojis;
type LogOptions = { context?: string };

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

  private stringifyArg(arg: unknown): string {
    if (typeof arg === "string") return arg;
    if (arg instanceof Error)
      return `${arg.name}: ${arg.message}\n${arg.stack}`;
    return JSON.stringify(arg, null, 2);
  }

  private format(level: LogLevel, context: string, ...args: unknown[]): string {
    const emoji = emojis[level] || "";
    const ctx = `${colors.cyan}[${context}]${colors.reset}`;

    let msgColor = colors.reset;
    switch (level) {
      case "error":
        msgColor = colors.red;
        break;
      case "warn":
        msgColor = colors.yellow;
        break;
      case "debug":
        msgColor = colors.magenta;
        break;
      case "verbose":
        msgColor = colors.gray;
        break;
      default:
        msgColor = colors.reset;
        break;
    }

    const message = args
      .map((arg) => `${msgColor}${this.stringifyArg(arg)}${colors.reset}`)
      .join(" ");

    return `${emoji} ${ctx} ${message}`;
  }

  private write(level: LogLevel, args: unknown[], opts?: LogOptions) {
    if (!this.enabled) return;

    const ctx = opts?.context || this.context;
    const msg = this.format(level, ctx, ...args);

    switch (level) {
      case "log":
      case "info":
        this.logger.info(msg);
        break;
      case "warn":
        this.logger.warn(msg);
        break;
      case "error":
        this.logger.error(msg);
        break;
      case "debug":
        this.logger.debug(msg);
        break;
      case "verbose":
        this.logger.trace(msg);
        break;
    }
  }

  private parseArgs(args: unknown[]): [unknown[], LogOptions?] {
    const [last] = args.slice(-1);
    const isOpts =
      typeof last === "object" &&
      last !== null &&
      !Array.isArray(last) &&
      "context" in last;
    return isOpts ? [args.slice(0, -1), last as LogOptions] : [args, undefined];
  }

  log(...args: unknown[]) {
    const [rest, opts] = this.parseArgs(args);
    this.write("log", rest, opts);
  }

  info(...args: unknown[]) {
    const [rest, opts] = this.parseArgs(args);
    this.write("info", rest, opts);
  }

  warn(...args: unknown[]) {
    const [rest, opts] = this.parseArgs(args);
    this.write("warn", rest, opts);
  }

  error(...args: unknown[]) {
    const [rest, opts] = this.parseArgs(args);
    this.write("error", rest, opts);
  }

  debug(...args: unknown[]) {
    const [rest, opts] = this.parseArgs(args);
    this.write("debug", rest, opts);
  }

  verbose(...args: unknown[]) {
    const [rest, opts] = this.parseArgs(args);
    this.write("verbose", rest, opts);
  }

  setContext(ctx: string) {
    this.context = ctx;
  }

  addSubContext(ctx: string) {
    this.context = this.context ? `${this.context}:${ctx}` : ctx;
  }
}
