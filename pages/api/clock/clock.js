const { schedule } = require("@netlify/functions");
const { twitterClient } = require("../../../libs/twitter.js")
const image_file = require.resolve("./vietnam_california.png");

const handler = async function (event, context) {
  let d = new Date()
  let hanoiZone = 'Asia/Bangkok'
  let caliZone = 'America/Los_Angeles'

  let hanoiTime = d.toLocaleString('en-GB', { timeZone: hanoiZone });
  let hanoiHour = parseInt(d.toLocaleTimeString('en-GB', { timeZone: hanoiZone }));
  
  let caliTime = d.toLocaleString('en-GB', { timeZone: caliZone });
  let caliHour = parseInt(d.toLocaleTimeString('en-GB', { timeZone: caliZone }));

  let message = `Now in Vietnam is ${hanoiTime} and \n in California is ${caliTime}. Conference call is possible!!!`
  let remoteURL = "https://geogenetics.dystillvision.com/content/posts/12-06/RUEXICO.png"

  // let earlyTime = 
  // let lateTime 

  console.log("TIME", caliTime, hanoiTime);
  console.log("CALI", typeof caliHour, caliHour);
  console.log("HANOI", typeof hanoiHour, hanoiHour);

  if (hanoiHour> 8 && hanoiHour < 22 && caliHour > 8 && caliHour < 22){
    try {
      console.log(message)
      console.log("HOUR in number", hanoiHour, caliHour)
      //////// Tweet out text only ///////////
      // await twitterClient.v2.tweet(message)
     
      ////////  Tweet out text and static local image ///////////
      const mediaIds = await Promise.all([
        twitterClient.v1.uploadMedia(image_file)
      ]);

      await twitterClient.v2.tweet({
        text: message,
        media: { media_ids: mediaIds }
      });

      ///// Tweet out text and image from url 
      // const response = await axios.get(remoteURL,  { responseType: 'arraybuffer' })
      // const buffer = Buffer.from(response.data, "utf-8")
      // const media_ids = await Promise.all([
      //   twitterClient.v1.uploadMedia(buffer, {type: 'png'})
      // ]);
      // await twitterClient.v2.tweet(message, { media_ids: media_ids  });

      console.log("Tweet successfully \n",message)
      return {
          statusCode: 200,
          message: message
      }
    } catch(e){
      let message = "#NETLIFY clock function ERROR: "+e.message
      console.log(message)
      // await twitterClient.v2.tweet(message)
      return {
        statusCode: 400,
        message: e
      }
    }
  } else {
    try {
      if (hanoiHour <= 8 || hanoiHour >= 22){
        console.log(hanoiTime, hanoiHour);
        await twitterClient.v2.tweet(`Now is ${hanoiTime} in Hanoi. Citi-Zens are sleeping or sleepy`);

      } else if (caliHour <= 8 || caliHour >= 22){
        console.log(caliTime, caliHour);
        await twitterClient.v2.tweet(`Now is ${caliTime} in California. Citi-Zens are sleeping or sleepy`);

      } else {
        console.log("Uncaught Condition");
        console.log("CALI", caliHour);
        console.log("HANOI", hanoiHour);
      }
    } catch(e){
      let message = "#NETLIFY clock function ERROR: "+e.message
      await twitterClient.v2.tweet(message)
    } 
  }
};

exports.handler = schedule("@hourly", handler);



