const { schedule } = require("@netlify/functions")
const { twitterClient } = require("../../../libs/twitter.js")
const fs  = require("fs")
const path  = require("path")
const matter = require('gray-matter')
const https = require('https'); 

const formatDate = function(date){
  let postFormat = date.toISOString().slice(5, 10)
  console.log("Formating date ", postFormat)
  return postFormat
}

const getTweets = function(postsDirectory, id){
	const fullPath = path.join(postsDirectory, id, `index.md`)
	const fileContents = fs.readFileSync(fullPath, 'utf8')
	const matterResult = matter(fileContents)

	let contents = matterResult.content
	let tweetCounts = contents.length / 280
	let trunks = contents.split(/\r?\n/);
	let tweetText = []
	let tweetImage = []

	for(trunk of trunks){
		if (trunk == ''){
			continue;
		} else if (trunk.startsWith("##")){
			continue;
		} else {
			let data = {}
			if(trunk.startsWith("!")){
				data.type = 'image'
				data.content = trunk 
				re = /\((.*)\)/;
				data.link = trunk.match(re)[1]
				tweetImage.push(data)
			} else {
				data.type = 'text'
				data.content = trunk 
				data.length = trunk.length
				tweetText.push(data)
			}
		}
	}

	let tweets = []

  console.log(`There are ${tweetImage.length} images and ${tweetText.length} paragraph in the text`)

	for (let i = 0; i < tweetText.length; i++) {
  	let tweet = {}
  	tweet.id = i
  	tweet.image = tweetImage[i]
  	tweet.text = tweetText[i]
  	tweets.push(tweet)
	}

	return tweets
}

const chunkIntoN = (arr, n) => {
	let newGroup = [...Array(n)].map(e => []);
	for (let i = 0; i < arr.length; i++){
		let boxNumber = i % n
		let tweet = arr[i]
		newGroup[boxNumber].push(tweet)
		//console.log("Box ", boxNumber, tweet)
	}
	return newGroup
}

const sentTweet = async (tweetObject) => {
  
	let text = tweetObject.text.content;
	let tweets = text.match(/[^\.!\?]+[\.!\?]+/g);
	let imageURL = tweetObject.image.link;
  let fileName = imageURL.split("/").pop()
  let fileType = fileName.split(".").pop()

  const tweetBurst = async (imagePath) => {
    for (let i = 0; i < tweets.length; i++){
      if (i == 0){
        const image_file = require.resolve(imagePath)
        const media_ids = await Promise.all([
          twitterClient.v1.uploadMedia(image_file)
        ]);
        console.log("TWEET ", tweets[i])
        //const media_ids = await twitterClient.v1.uploadMedia(path)
        try {
          await twitterClient.v2.tweet({
            text: tweets[i], 
            media: { media_ids: media_ids  }
          });
        } catch(e){
          console.log(e)
          await twitterClient.v2.tweet(e.message)
        }
      } else {
        try {
          await twitterClient.v2.tweet(tweets[i])
          console.log("TWEET ", tweets[i])
        } catch(e){
          console.log("Text: ", tweets[i]);
          await twitterClient.v2.tweet(e.message)
        }
      }
    }
  }

  https.get(imageURL,(res) => {    
    // Image will be stored at this path
    const temp_folder = process.env.TEMP
    const imagePath = path.join(temp_folder,fileName);  
    const filePath = fs.createWriteStream(imagePath); 
    res.pipe(filePath); 

    filePath.on('finish',() => { 
        filePath.close(); 
        console.log('Download Completed to', imagePath);
        tweetBurst(imagePath)  
    }) 
  })	
}

module.exports.handler = schedule('0 * * * *', async (event) => {

  const postsTopic = "public/content/posts"
	const postsDirectory = path.join(process.cwd(), postsTopic)	
	let fileNames = fs.readdirSync(postsDirectory)
	let d = new Date()
	let currentHour = d.getHours()
	//let today = formatDate(d)
	let today = "10-07"

  try {
  	if (fileNames.includes(today)){
  		let tweets = getTweets(postsDirectory, today)
  		let tweetCounts = tweets.length
  		let chunked = chunkIntoN(tweets, 24)
  		let tobeTweets = chunked[currentHour]

  		for (const content of tobeTweets){
  			await sentTweet(content)
        console.info("INFO",content)
  			setTimeout(() => {
  		    console.info("Resting for 0.1 second.\n");
  		  }, 100);
  		}
  	} else {
  		console.info("there is no post today")
  	}
  } catch(e){
    let message = "#NETLIFY chunk function ERROR: "+e.message
    await twitterClient.v2.tweet(message)
    console.log(message)
    return {
      statusCode: 400,
      message: e
    }
  }
})