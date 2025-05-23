import fs from 'fs'
import process from 'process'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

export default async function handler(req, res){
	let dataPack = req.body
	let location = dataPack.location
	let markdownContent = dataPack.data

	let folder = "public/content/locations"
	let file_path = path.join(folder, location, "research.md")



	try {
		console.log("DATA PACK \n", dataPack)

		fs.writeFileSync(
			file_path, 
			markdownContent
		)

		const fileContents = fs.readFileSync(file_path, 'utf8')
		const matterResult = matter(fileContents)
		const content = matterResult.content
		const contentHTML = await remark()
			.use(html)
			.process(content)

		const htmlString = contentHTML.toString()

		const metaData = matterResult.data
		const tags = metaData.tags

		res.status(200).json({
			success: true, 
			message: "Updated MARKDOWN File Content",
			content: content, 
			htmlString: htmlString
		})

	} catch {
		res.status(400).json({
			success: false, 
			message: "Fail to Update MARKDOWN"
		})
	}
}