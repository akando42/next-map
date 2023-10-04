const { schedule } = require("@netlify/functions")
const { twitterClient } = require("../../../libs/twitter.js")
const fs  = require("fs")
const path  = require("path")
const matter = require('gray-matter')

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
  		} else if (trunk.startsWith("#")){
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

module.exports.handler = schedule('0 * * * *', async (event) => {
	const postsTopic = "public/content/posts"
  	const postsDirectory = path.join(process.cwd(), postsTopic)	
  	let fileNames = fs.readdirSync(postsDirectory)
  	let d = new Date()
  	let currentHour = d.getHours()
  	let today = formatDate(d)
  	//let today = "10-07"

  	if (fileNames.includes(today)){
  		console.log("there is post today")
  		let tweets = getTweets(postsDirectory, today)
  		let tweetCounts = tweets.length
  		let chunked = chunkIntoN(tweets, 24)
  		console.log(chunked[currentHour])
  	} else {
  		console.log("there is no post today")
  	}
})