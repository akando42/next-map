import { Component } from "react" 
import { getAllPostIds, getPostData } from '../libs/posts'
import path from "path"
import Styles from '../styles/Post.module.css'
const postsTopic = "public/content/posts"
const postsDirectory = path.join(process.cwd(), postsTopic)

export async function getStaticProps({ params }) {
  const postsData = await getPostData(postsDirectory, params.id)
  return {
    props: {
      postsData
    }
  }
}

export async function getStaticPaths(){
	const paths = getAllPostIds(postsDirectory)
    console.log("our static paths is", paths)
  
	return {
		paths,
		fallback: false
	}
}

export default class Post extends Component {
	constructor(props){
		super(props)
	}

	componentDidMount(){}

	render(){
		return (
			<div>
				<div>
					{this.props.postsData.title}
				</div>
				<div>
					{this.props.postsData.path}
				</div>
				<div>
					{this.props.postsData.cover}
				</div>
				<div>
					{this.props.postsData.tags}
				</div>
				<div
				    className={Styles.cover}
					style={{
		              backgroundSize: `cover`,
		              backgroundImage: `url(${this.props.postsData.cover})`
		            }}
				>
				</div>
				<div 
		            className={Styles.content} 
		            dangerouslySetInnerHTML={{ __html: this.props.postsData.contentHtml }} 
		        />
			</div>
		)
	}
}