import mongoose from "mongoose";
import databaseConfig from "./database.js";
import logger from "../utils/logger.js";

const connectionStates = {
  CONNECTED: 0,
  CONNECTING: 1,
  DISCONNECTING: 2,
  DISCONNECTED: 3,
};

let connectionState = connectionStates.DISCONNECTED;
let isConnecting = false;

// ================== CONNECT ==================
const connectDB = async () => {
  if (connectionState === connectionStates.CONNECTED && !isConnecting) {
    logger.info("MongodDB is already connected");
    return;
  }
  if (isConnecting) {
    logger.info("MongoDB is connecting ......");
    return;
  }

  connectionState = connectionStates.CONNECTING;
  isConnecting = true;

  try {
    await mongoose.connect(databaseConfig.url, databaseConfig.options);
    connectionState = connectionStates.CONNECTED;
    logger.info("MongoDB is Connected");
  } catch (error) {
    connectionState = connectionStates.DISCONNECTED;
    logger.error("Error happened in connecting MongoDB",error);
    throw error; // propagate error to stop server if needed
  } finally {
    isConnecting = false;
  }
};

// ================== CLOSE CONNECTION ==================
const closeConnection = async () => {
  if (connectionState !== connectionStates.CONNECTED) return;
  try {
    connectionState = connectionStates.DISCONNECTING;
    await mongoose.connection.close();
    connectionState = connectionStates.DISCONNECTED;
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
};

// ================== EVENTS ==================
const setUpEvents = () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB low-level driver connected");
  });

  mongoose.connection.once("open", () => {
    console.log("MongoDB fully ready (open)");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected successfully");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
    connectionState = connectionStates.DISCONNECTED;
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
};

setUpEvents();

export { closeConnection, connectionState };
export default connectDB;
