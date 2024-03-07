const kue = require("kue");
const queue = kue.createQueue();

const jobs = [
  {
    phoneNumber: "4153518780",
    message: "This is the code 1234 to verify your account",
  },
  {
    phoneNumber: "4153518781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4153518782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4153518783",
    message: "This is the last code 007 to verify your account",
  },
  {
    phoneNumber: "4153538781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4153118782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4153718781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4159518782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4158718781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4153818782",
    message: "This is the code 4321 to verify your account",
  },
  {
    phoneNumber: "4154318781",
    message: "This is the code 4562 to verify your account",
  },
  {
    phoneNumber: "4151218782",
    message: "This is the code 4321 to verify your account",
  },
];

// Loop through each job in the jobs array
jobs.forEach((jobData, index) => {
  // Create a new job in the 'push_notification_code_2' queue with the jobData object
  const job = queue.create("push_notification_code_2", jobData).save((err) => {
    if (!err) console.log(`Notification job created: ${job.id}`);
  });

  // Set up listener for job completion
  job.on("complete", () => {
    console.log(`Notification job ${job.id} completed`);
  });

  // Set up listener for job failure
  job.on("failed", (errorMessage) => {
    console.log(`Notification job ${job.id} failed: ${errorMessage}`);
  });

  // Set up listener for job progress
  job.on("progress", (progress) => {
    console.log(`Notification job ${job.id} ${progress}% complete`);
  });
});
