import mongoose from "mongoose";
import * as dotenv from "dotenv";
import nodeProcess from "process";
dotenv.config();

class DatabaseConnection {
  constructor() {
    this.retryCount = 0;
    this.maxRetries = 5;
    this.retryInterval = 5000;
    this.isConnected = false;
  }

  get connectionOptions() {
    return {
      maxPoolSize: 1000,
      minPoolSize: 50,
      maxIdleTimeMS: 60000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,

      writeConcern: {
        w: "majority",
        j: true,
        wtimeout: 5000,
      },

      readPreference: "secondaryPreferred",
      heartbeatFrequencyMS: 10000,
      serverSelectionTimeoutMS: 30000,
      compressors: ["zlib"],
      dbName: process.env.DB_NAME,

      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },

      autoIndex: false,
    };
  }

  async connect() {
    try {
      if (this.isConnected) {
        console.log("Already connected to MongoDB");
        return;
      }

      const uri = this.getConnectionUri();

      await mongoose.connect(uri, this.connectionOptions);

      this.setupEventListeners();
      this.setupErrorHandling();
      this.setupConnectionMonitoring();

      this.isConnected = true;
      console.log("✅ Ok!..mongodb connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      await this.handleConnectionError(error);
    }
  }

  getConnectionUri() {
    const hosts = process.env.MONGO_HOSTS?.split(",") || [
      process.env.MONGO_URI,
    ];
    const replicaSet = process.env.MONGO_REPLICA_SET;
    const credentials =
      process.env.MONGO_USER && process.env.MONGO_PASSWORD
        ? `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`
        : "";

    return replicaSet
      ? `mongodb://${credentials}${hosts.join(",")}/?replicaSet=${replicaSet}`
      : process.env.MONGO_URI;
  }

  setupEventListeners() {
    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("MongoDB connected...");
      this.retryCount = 0;
    });

    db.on("disconnected", async () => {
      console.log("MongoDB disconnected...");
      this.isConnected = false;
      await this.handleDisconnection();
    });

    db.on("reconnected", () => {
      console.log("MongoDB reconnected...");
      this.isConnected = true;
    });

    ["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) => {
      nodeProcess.on(signal, async () => {
        await this.cleanup();
        nodeProcess.exit(0);
      });
    });
  }

  setupErrorHandling() {
    nodeProcess.on("unhandledRejection", (error) => {
      console.error("Unhandled Promise Rejection:", error);
    });

    mongoose.connection.on("error", async (error) => {
      console.error("MongoDB error:", error);
      await this.handleConnectionError(error);
    });
  }

  setupConnectionMonitoring() {
    setInterval(async () => {
      if (mongoose.connection.readyState !== 1) {
        console.log("Unhealthy connection state detected");
        await this.handleDisconnection();
      }
    }, 30000);
  }

  async handleConnectionError(error) {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      console.log(
        `Retrying connection (${this.retryCount}/${this.maxRetries})...`
      );
      await new Promise((resolve) => setTimeout(resolve, this.retryInterval));
      await this.connect();
    } else {
      console.error("Max retry attempts reached");
      nodeProcess.exit(1);
    }
  }

  async handleDisconnection() {
    if (!this.isConnected) {
      await this.connect();
    }
  }

  async cleanup() {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
    }
  }
}

const dbConnection = new DatabaseConnection();

export default async function dbConnect() {
  await dbConnection.connect();
  return dbConnection;
}
