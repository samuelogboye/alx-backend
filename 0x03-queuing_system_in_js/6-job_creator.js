// Import Kue to create and manage the job queue
const kue = require('kue');
const queue = kue.createQueue();

// Job data object
const jobData = {
  phoneNumber: '1234567890', // Example phone number
  message: 'This is a test message' // Example message
};

// Create a job in the 'push_notification_code' queue with the jobData object
const job = queue.create('push_notification_code', jobData).save((err) => {
  if (!err) console.log(`Notification job created: ${job.id}`);
});

// Set up listener for job completion
job.on('complete', () => {
  console.log('Notification job completed');
});

// Set up listener for job failure
job.on('failed', (errorMessage) => {
  console.log('Notification job failed', errorMessage);
});
