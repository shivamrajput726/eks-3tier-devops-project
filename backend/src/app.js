const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const client = require("prom-client");

const healthRoutes = require("./routes/health.routes");
const taskRoutes = require("./routes/task.routes");
const { notFoundHandler, errorHandler } = require("./middleware/error-handler");

const metricsRegistry = new client.Registry();

client.collectDefaultMetrics({
  prefix: "three_tier_backend_",
  register: metricsRegistry,
});

const httpRequestDuration = new client.Histogram({
  name: "three_tier_backend_http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  registers: [metricsRegistry],
});

const httpRequestsTotal = new client.Counter({
  name: "three_tier_backend_http_requests_total",
  help: "Total number of HTTP requests handled by the backend",
  labelNames: ["method", "route", "status_code"],
  registers: [metricsRegistry],
});

function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use(
    morgan("combined", {
      skip: () => process.env.NODE_ENV === "test",
    }),
  );

  app.use((req, res, next) => {
    const start = process.hrtime.bigint();

    res.on("finish", () => {
      const route = req.route?.path || req.baseUrl || req.path;
      const labels = {
        method: req.method,
        route,
        status_code: String(res.statusCode),
      };
      const durationSeconds =
        Number(process.hrtime.bigint() - start) / 1_000_000_000;

      httpRequestsTotal.inc(labels);
      httpRequestDuration.observe(labels, durationSeconds);
    });

    next();
  });

  app.get("/metrics", async (_req, res, next) => {
    try {
      res.set("Content-Type", metricsRegistry.contentType);
      res.end(await metricsRegistry.metrics());
    } catch (error) {
      next(error);
    }
  });

  app.use("/", healthRoutes);
  app.use("/api/tasks", taskRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = {
  createApp,
  metricsRegistry,
};
