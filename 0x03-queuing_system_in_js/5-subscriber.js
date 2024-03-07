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

// subscribe
client.subscribe("holberton school channel");

// handle messages
client.on("message", (channel, message) => {
  if (channel === "holberton school channel") {
    console.log(message); // Log any message from the "holberton school channel"

    if (message === "KILL_SERVER") {
      client.unsubscribe(); // Unsubscribe from all channels
      client.quit(); // Quit the Redis client
    }
  }
});
