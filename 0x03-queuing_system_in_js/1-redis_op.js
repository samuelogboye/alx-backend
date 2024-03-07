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

// function to set key and value in redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

// function to get value of key in redis
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    console.log(reply);
  });
}

displaySchoolValue("Holberton");
setNewSchool("HolbertonSanFrancisco", "100");
displaySchoolValue("HolbertonSanFrancisco");
