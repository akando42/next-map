const { schedule } = require("@netlify/functions");

const handler = async function (event, context) {
  let d = new Date()
  let timeZone = 'Asia/Bangkok'
  let ank = d.toLocaleString('en-US', { timeZone: timeZone });
  console.log("Current time in "+timeZone+"is " + ank)
  return {
    statusCode: 200,
    body: JSON.stringify({ message:"Current time in "+timeZone+" is " + ank }),
  };
};

exports.handler = schedule("@hourly", handler);