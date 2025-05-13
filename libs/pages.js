import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

export async function getPagesData(postDirectory, id){
	const dirPath = path.join(postDirectory, id)
	const files = fs.readdirSync(dirPath)

	console.log("Page Files ", files)

	const fullPath = path.join(dirPath, "index.md")
	const fileContents = fs.readFileSync(fullPath, 'utf8')

	console.log("Path\n", fullPath)
	// console.log("File Contents\n", fileContents)

	const matterResult = matter(fileContents)
	const content = matterResult.content
	const contentHTML = await remark()
		.use(html)
		.process(content)

	const htmlString = contentHTML.toString()

	const metaData = matterResult.data
	const tags = metaData.tags

	// console.log("Tags", tags)
	// console.log("Content ", content)
	// console.log("Meta Data", metaData)
	// console.log("Content HTML", htmlString)

	return {
		id, 
		postDirectory, 
		content, 
		htmlString
	}
}