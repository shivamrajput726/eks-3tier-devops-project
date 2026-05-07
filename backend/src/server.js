const { createApp } = require("./app");
const { connectToDatabase, disconnectFromDatabase } = require("./config/database");
const env = require("./config/env");

async function startServer() {
  await connectToDatabase(env.mongodbUri);

  const app = createApp();
  const server = app.listen(env.port, () => {
    console.log(`Backend API listening on port ${env.port}`);
  });

  const shutdown = async (signal) => {
    console.log(`Received ${signal}, shutting down gracefully`);
    server.close(async () => {
      await disconnectFromDatabase();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

startServer().catch((error) => {
  console.error("Failed to start backend", error);
  process.exit(1);
});
