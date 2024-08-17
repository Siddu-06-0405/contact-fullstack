const moment = require("moment-timezone");
const createdAtIST = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
console.log(createdAtIST)