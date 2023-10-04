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

const getContent = function(postsDirectory, id){
	let resObj = {
		'contents':[]
	}
	return resObj
}

module.exports.handler = schedule('0 * * * *', async (event) => {
	const postsTopic = "public/content/posts"
  	const postsDirectory = path.join(process.cwd(), postsTopic)	
  	let fileNames = fs.readdirSync(postsDirectory)
  	let d = new Date()
  	//let today = formatDate(d)
  	let today = "10-07"

  	if (fileNames.includes(today)){
  		console.log("there is post today")
  	} else {
  		console.log("there is no post today")
  	}
})