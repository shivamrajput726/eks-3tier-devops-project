const mongoose = require("mongoose");

async function connectToDatabase(connectionString) {
  if (!connectionString) {
    throw new Error("MONGODB_URI is required");
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(connectionString, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 20,
  });
}

async function disconnectFromDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

module.exports = {
  connectToDatabase,
  disconnectFromDatabase,
};
