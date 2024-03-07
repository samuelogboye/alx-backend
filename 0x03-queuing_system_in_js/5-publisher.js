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

// publish
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    client.publish("holberton school channel", message);
  }, time);
}

publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
