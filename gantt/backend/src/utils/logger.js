import pino from "pino";
import pkg from "pino-multi-stream";
const { multistream } = pkg;
import pinoHttp from "pino-http";
import fs from "fs";
import path from "path";

// dossier des logs
const logDir = path.resolve("./app/logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// fichier de logs
const logFile = fs.createWriteStream(path.join(logDir, "app.log"), { flags: "a" });

// transports multi
const streams = [];

if (process.env.NODE_ENV === "development") {
  streams.push({
    stream: pino.transport({
      target: "pino-pretty",
      options: { colorize: true, translateTime: true },
    }),
  });
} else {
  streams.push({ stream: process.stdout });
}

streams.push({ stream: logFile });

export const logger = pino(
  { level: process.env.LOG_LEVEL || "info" },
  multistream(streams)
);

// middleware HTTP
export const httpLogger = pinoHttp({
  logger,
  customSuccessMessage(req, res) {
    return `✔ ${req.method} ${req.url} ${res.statusCode}`;
  },
  customErrorMessage(req, res, err) {
    return `❌ ${req.method} ${req.url} ${res.statusCode} - ${err.message}`;
  },
});
