// Import Kue to create and manage the job queue
const kue = require("kue");
const queue = kue.createQueue();

// Array containing blacklisted phone numbers
const blacklistedNumbers = ["4153518780", "4153518781"];

// Function to process jobs
function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100); // Track the progress of the job at 0%

  if (blacklistedNumbers.includes(phoneNumber)) {
    // Fail the job if the phone number is blacklisted
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Track the progress to 50%
  job.progress(50, 100);

  // Log the notification message
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  );

  // Simulate the completion of the job
  done();
}

// Process jobs from the 'push_notification_code_2' queue, two at a time
queue.process("push_notification_code_2", 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
