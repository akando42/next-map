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

const getPost = function(postsDirectory, id){
  const fullPath = path.join(postsDirectory, id, `index.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  let postPath = "https://geogenetics.dystillvision.com/"+id
  let postCover = "https://geogenetics.dystillvision.com/"+matterResult.data.cover
  let postTitle = matterResult.data.title
  let tags = matterResult.data.tags

  // console.log(tags)

  let resObj = {
    'path':postPath,
    'postCover': postCover,
    'title': postTitle, 
    'tags': tags
  }

  return resObj
}

module.exports.handler = schedule('0 0 * * *', async (event) => {
  const postsTopic = "public/content/posts"
  const postsDirectory = path.join(process.cwd(), postsTopic)
  const eventBody = JSON.parse(event.body)

  let fileNames = fs.readdirSync(postsDirectory)
  let d = new Date()
  let today = formatDate(d)
  //let today = "09-25"

  if (fileNames.includes(today)){
    console.log("there is post today");
    
    let timeZone = 'Asia/Bangkok';
    let localTime = d.toLocaleString('en-US', { timeZone: timeZone });
    let postData = getPost(postsDirectory,today);
    
    let message = postData.title + "\n\n\n" + postData.path + "\n\n";

    for (tag of postData.tags){ 
      tag = tag.replace(/ /g,"_");
      message = message + " #" + tag
    }

    try {
      console.log("Posting tweet \n", message);
      await twitterClient.v2.tweet(message);
      
      return {
        statusCode: 200,
        message: message
      }
    } catch(e) {
      console.log(e)
      return {
        statusCode: 200,
        message: e
      }
    }
  } else {
    console.log("there is no post today !");
  }
})
