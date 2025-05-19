import { getPagesData } from '../../libs/pages'

export default async function handler(req, res){
	let doc_id = req.query.doc_id
	let docsDirectory =  "public/content/locations"

	const pagesData = await getPagesData(
		docsDirectory, doc_id
	)

	res.status(200).json(pagesData)
}