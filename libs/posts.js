import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

// const postsDirectory = path.join(process.cwd(), 'writing/codes')

export function getSortedPostsData(postsDirectory) {
  // console.log("parsing Markdown post from", postsDirectory)
  
  // Get file names under /posts
  const dirNames = fs.readdirSync(postsDirectory).filter(checkType)
  
  function checkType(dirName){
      return dirName != ".DS_Store"
  }

  const allPostsData = dirNames.map(dirName => {
    // Remove ".md" from file name to get id
    const id = dirName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, id, `index.md`)

    // console.log(fullPath);

    // Read File Sync (if on there are files)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })

  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a > b) {
      //console.log(a, ">", b)
      return 1
      
    } else if (a < b) {
      //console.log(a, "<", b)
      return -1

    } else {
      return 0
    }
  })
}


export async function getAllPostsData(postsDirectory){
  const dirNames = fs.readdirSync(postsDirectory).filter(checkType)
  
  function checkType(dirName){
      return dirName != ".DS_Store"
  }

  const allPostsData = dirNames.map(dirName => {
    // Remove ".md" from file name to get id
    const id = dirName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, id, `index.md`)

    // console.log(fullPath);

    // Read File Sync (if on there are files)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    const content = matterResult.content

    // Combine the data with the id
    return {
      id,
      content,
      ...matterResult.data
    }
  })

  return allPostsData
}

export function getAllPostIds(postsDirectory) {
  let articlesList = []
  let dirList = fs.readdirSync(postsDirectory)
    .filter(dir => dir !== ".DS_Store")

  dirList.map(dir => {
    // console.log("Directory", dir)
    let fullDirPath = path.join(postsDirectory, dir)
    let fileNames = fs.readdirSync(fullDirPath)

    const articles = fileNames.filter(file => file.split(".")[1] === "md")
    articles.map(article => {
      let articleName = article.replace(/\.md$/, '')
      // console.log("ARTICLE NAME ", articleName)
      
      if (articleName === "index"){
        articlesList.push({
          params: {
            id: `${dir}`
          } 
        })
      } else {
        articlesList.push({
          params: {
            id: `${dir}`
          } 
        })
      }
    })
  })

  // console.log("ARTICLES ", articlesList)
  return articlesList

  // const fileNames = fs.readdirSync(postsDirectory)
  // console.log(
  //   "Files in this directory ", 
  //   postsDirectory, "\n ", 
  //   fileNames
  // );
  // // Modifying and Updating Sitemap HERE 

  // return fileNames.map(fileName => {
  //   return {
  //     params: {
  //       id: fileName.replace(/\.md$/, '')
  //     }
  //   }
  // })
}

export async function getPostData(postsDirectory, id) {
  const dirPath = path.join(postsDirectory, id)

  console.log("DIR PATH ID", id)
  const relatedFiles = fs.readdirSync(dirPath)

  const articles = relatedFiles.filter(
    file => file.split(".")[1] === "md")

  //console.log("RELATED FILES", relatedFiles)
  //console.log("ARTICLES", articles)
  //console.log("POST Directory ", postsDirectory)
  //console.log("POST ID", id)

  async function parseContent(postsDirectory, id, contentFile){
    // console.log("Parsing Content", postsDirectory, id, contentFile)
    // console.log("CONTENT FILE", contentFile)

    const fullPath = path.join(postsDirectory, id, contentFile)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    console.log("POST FULL PATH", fullPath)
    // console.log("FILE CONTENT", fileContents)
    // Use gray-matter to parse the post metadata section

    const matterResult = matter(fileContents)
    const content = matterResult.content
    
    const metaData = matterResult.data
    console.log(
      "##### META DATA ####\n\n\n", metaData
    )

    // CONTENT FILTERING for TAGS keyword
    const tags = metaData.tags
    console.log(tags)

    const cities = tags.filter((tag) => (tag !== "GeoGenetics" & tag !== "Spykman World"))
    console.log("Cities", cities)

    // EXPEDIA API REVERSE TAG KEYWORD for PRICING

    let airFun = []
    cities.map(city => airFun.push({
      'origin': city, 
      'destination': 'Hanoi'
    }))

    console.log(airFun)

    // INSERT LINK INTO MARKDOWN
    
    let contentArray = content.split(" ")
    // console.log("ACTUAL CONTENT \n\n\n", contentArray)

    let cityMentions = contentArray.filter(
      content => cities.includes(content)
    )

    let newContent = ""
    console.log("City Mentioned", cityMentions)

    contentArray.map(content => {
      if(cities.includes(content)){
        let link = `[**${content}**](http://localhost:3000/) `
        // let link = `<div>${content}</div> `
        console.log("CITY ", link)
        newContent = newContent.concat(link)

        // newContent = newContent.concat("Hoang ")
      } else {
        newContent = newContent.concat(`${content} `)
      }
    })

    // Use remark to convert markdown into HTML string
    // const processedContent = await remark()
    //   .use(html)
    //   .process(content)

    const processedContent = await remark()
      .use(html)
      .process(newContent)

    const contentHtml = processedContent.toString()
    // contentHtml.replace("<strong>*</strong>", "<strong>Hoang</strong")

    return {
      contentHtml: contentHtml,
      content: content, 
      data: matterResult.data,
      cityMentions: cityMentions
    }
  }

  let original =  await parseContent(postsDirectory, id, 'index.md')
  let contentHtml = original.contentHtml
  let content = original.content
  let cityMentions = original.cityMentions
  let data = original.data

  let updates = articles.filter(file => file.split(".")[0] !== "index")
  // console.log("UPDATES ", updates)

  let updatedArticles = []

  updates.map( async(update) => {
    console.log("PARSING",update)
    let updateData = await parseContent(
      postsDirectory, id, update
    )
    // console.log("UPDATE CONTENT ", updateData)
    updatedArticles.push(updateData)
  })

  // Combine the data with the id
  return {
    id,
    cityMentions: cityMentions,
    updatedArticles,
    contentHtml,
    content,
    ...data
  }
}
