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
      console.log(a, ">", b)
      return 1
    } else if (a < b) {
      console.log(a, "<", b)
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostIds(postsDirectory) {
  const fileNames = fs.readdirSync(postsDirectory)

  // console.log("Files in this directory ", postsDirectory, "\n ", fileNames);
  // Modifying and Updating Sitemap HERE 

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(postsDirectory, id) {
  const dirPath = path.join(postsDirectory, id)
  const relatedFiles = fs.readdirSync(dirPath)

  const articles = relatedFiles.filter(
    file => file.split(".")[1] === "md")

  //console.log("RELATED FILES", relatedFiles)
  //console.log("ARTICLES", articles)
  //console.log("POST Directory ", postsDirectory)
  //console.log("POST ID", id)

  async function parseContent(postsDirectory, id, contentFile){
    console.log("CONTENT FILE", contentFile)

    const fullPath = path.join(postsDirectory, id, contentFile)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // console.log("POST FULL PATH", fullPath)
    // console.log("FILE CONTENT",fileContents)
    // Use gray-matter to parse the post metadata section

    const matterResult = matter(fileContents)
    const content = matterResult.content

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)

    const contentHtml = processedContent.toString()

    return {
      contentHtml: contentHtml,
      content: content, 
      data: matterResult.data
    }
  }

  let original =  await parseContent(postsDirectory, id, 'index.md')
  let contentHtml = original.contentHtml
  let content = original.content
  let data = original.data

  let updates = articles.filter(file => file.split(".")[0] !== "index")
  // console.log("UPDATES ", updates)

  let updatedArticles = []

  updates.map( async(update) => {
    // console.log("PARSING",update)
    let updateData = await parseContent(postsDirectory, id, update)
    // console.log("UPDATE CONTENT ", updateData)
    updatedArticles.push(updateData)
  })

  // Combine the data with the id
  return {
    id,
    contentHtml,
    content,
    ...data,
    updatedArticles
  }
}
