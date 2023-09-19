const { schedule } = require('@netlify/functions')
const { twitterClient } = require("../../../libs/twitter.js")

module.exports.handler = schedule('0 0 * * *', async (event) => {
  const eventBody = JSON.parse(event.body)
  let d = new Date()
  let timeZone = 'Asia/Bangkok'
  let localTime = d.toLocaleString('en-US', { timeZone: timeZone });
  let message = `New day, current local time in ${timeZone} is ${localTime}`;
  console.log(message)
  
  try {
    await twitterClient.v2.tweet(message);
    return {
      statusCode: 200,
      message: message
    }
  } catch(e) {
    return {
      statusCode: 200,
      message: e
    }
  }
})
