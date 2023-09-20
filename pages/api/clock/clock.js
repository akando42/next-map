const { schedule } = require("@netlify/functions");
const { twitterClient } = require("../../../libs/twitter.js")

const handler = async function (event, context) {
  let d = new Date()
  let timeZone = 'Asia/Bangkok'
  let ank = d.toLocaleString('en-US', { timeZone: timeZone });
  let message = "Current time in Hanoi is "+ ank
  try {
	await twitterClient.v2.tweet(message);
	console.log("Tweet successfully \n",message)
	return {
    	statusCode: 200,
    	message: message
	}
  } catch(e){
  	console.log(e)
	return {
		statusCode: 200,
		message: e
	}
  }
};

exports.handler = schedule("@hourly", handler);