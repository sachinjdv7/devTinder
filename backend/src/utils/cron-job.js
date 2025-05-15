const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const { ConnectionRequest } = require("../models/connectionRequest.model");

cron.schedule("0 8 * * *", async () => {
  // send email to all people who got request the previous day

  try {
    const yesterday = subDays(new Date(), 1);

    //calculate start of the yesterday and end data of yesterday

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequst = await ConnectionRequest.find({
      status: "intrested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmailsToSend = [
      ...new Set(pendingRequst.map((req) => req.toUserId.emailId)),
    ];
    for (const email of listOfEmailsToSend) {
      // send emails
    }
  } catch (error) {
    console.error(error);
  }
});
