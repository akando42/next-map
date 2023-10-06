const { schedule } = require("@netlify/functions");
const { twitterClient } = require("../../../libs/twitter.js")
const image_file = require.resolve("./vietnam_california.png");

const handler = async function (event, context) {
  let d = new Date()
  let hanoiZone = 'Asia/Bangkok'
  let caliZone = 'America/Los_Angeles'
  let hanoiTime = d.toLocaleString('en-GB', { timeZone: hanoiZone });
  let caliTime = d.toLocaleString('en-GB', { timeZone: caliZone });
  let message = `Now in Vietnam is ${hanoiTime} and \n in California is ${caliTime}. Conference all is possible!!!`
  let remoteURL = "https://geogenetics.dystillvision.com/content/posts/12-06/RUEXICO.png"

  if (parseInt(hanoiTime) > 8 && parseInt(hanoiTime) < 22 && parseInt(caliTime) > 8 && parseInt(caliTime) < 22){
    try {
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
      await twitterClient.v2.tweet(message)
      return {
        statusCode: 400,
        message: e
      }
    }
  } else {
    try {
      console.log("Hanoi or California is sleeping or sleepy")
    } catch(e){
      let message = "#NETLIFY clock function ERROR: "+e.message
      await twitterClient.v2.tweet(message)
    }
    
  }
};

exports.handler = schedule("@hourly", handler);



