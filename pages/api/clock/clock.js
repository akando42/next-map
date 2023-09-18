const { schedule } = require("@netlify/functions");

const handler = async function (event, context) {
  let d = new Date()
  let ank = d.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
  console.log("your time zone " + ank)
  return {
    statusCode: 200,
    body: JSON.stringify({ message:"your time zone " + ank }),
  };
};

exports.handler = schedule("@hourly", handler);