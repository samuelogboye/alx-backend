// Using ES6 import to import the redis library
import redis from "redis";

// Create a Redis client
const client = redis.createClient();

// Listen for the "connect" event to log the successful connection message
client.on("connect", () => {
  console.log("Redis client connected to the server");
});

// Listen for the "error" event to log any connection errors
client.on("error", (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});
