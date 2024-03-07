const express = require("express");
const redis = require("redis");
const { promisify } = require("util");
const kue = require("kue");

const app = express();
const queue = kue.createQueue();
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

let reservationEnabled = true;

async function reserveSeat(number) {
  await setAsync("available_seats", number);
}

async function getCurrentAvailableSeats() {
  const seats = await getAsync("available_seats");
  return parseInt(seats);
}

// Initialize the number of available seats to 50
reserveSeat(50);

app.get("/available_seats", async (req, res) => {
  const seats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: seats });
});

app.get("/reserve_seat", (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: "Reservation are blocked" });
  }

  const job = queue.create("reserve_seat", {}).save((err) => {
    if (err) {
      return res.json({ status: "Reservation failed" });
    }

    res.json({ status: "Reservation in process" });
  });

  job
    .on("complete", () => {
      console.log(`Seat reservation job ${job.id} completed`);
    })
    .on("failed", (errorMessage) => {
      console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
    });
});

app.get("/process", (req, res) => {
  res.json({ status: "Queue processing" });

  queue.process("reserve_seat", async (job, done) => {
    const currentSeats = await getCurrentAvailableSeats();
    if (currentSeats <= 0) {
      reservationEnabled = false;
      return done(new Error("Not enough seats available"));
    }

    await reserveSeat(currentSeats - 1);
    if (currentSeats - 1 === 0) {
      reservationEnabled = false;
    }

    done();
  });
});

app.listen(1245, () => {
  console.log("Server is listening on port 1245");
});
