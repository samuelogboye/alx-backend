function createPushNotificationsJobs(jobs, queue) {
  // Check if jobs is an array
  if (!Array.isArray(jobs)) {
    throw new Error("Jobs is not an array");
  }

  jobs.forEach((jobData) => {
    // Create a new job in the 'push_notification_code_3' queue
    const job = queue
      .create("push_notification_code_3", jobData)
      .save((err) => {
        if (!err) {
          console.log(`Notification job created: ${job.id}`);
        }
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
}

module.exports = createPushNotificationsJobs;
