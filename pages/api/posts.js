import { getAllPostIds } from '../../libs/posts'
import path from "path"

const postsTopic = "public/content/posts"
const postsDirectory = path.join(process.cwd(), postsTopic)

export default async function handler(req, res){
	const paths = getAllPostIds(postsDirectory)
	const fullPaths = paths.map(path => "https://geogenetics.dystillvision.com/"+path.params.id)
	
	res.status(200).json(fullPaths)
}