const cron = require('node-cron');
const RecurringTasksDb = require('../model/RecurringTasks/RecurringTasks');

// Set up a scheduled task to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log("Cron Job Running");
  try {
    const a = await RecurringTasksDb.updateMany(
      {},
      { isChecked: false },
      { multi: true }
    );
    console.log(a);
  } catch (error) {
    console.error("Error executing cron job:", error);
  }
});