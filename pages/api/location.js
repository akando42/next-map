import { getPagesData, getResearchData } from '../../libs/pages'

export default async function handler(req, res){
	let doc_id = req.query.doc_id
	let docsDirectory =  "public/content/locations"

	const pagesData = await getPagesData(
		docsDirectory, doc_id
	)

	const researchData = await getResearchData(
		docsDirectory, doc_id
	)

	console.log("Research Data", researchData)
	console.log("Page Data", pagesData)

	res.status(200).json({
		success: true, 
		pagesData: pagesData, 
		researchData: researchData
	})
}