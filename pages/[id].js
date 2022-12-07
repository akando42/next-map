import { Component } from "react" 
import { getAllPostIds, getPostData } from '../libs/posts'
import path from "path"
import Styles from '../styles/Post.module.css'
const postsTopic = "public/content/posts"
const postsDirectory = path.join(process.cwd(), postsTopic)
import Map from "../components/Map"
import Logo from "../components/Logo"

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
				<Logo />
			    <Map 
			    	width="100vw" 
			    	height="50vh" 
			    	zoom="10" 
			    	lng="120.09105767050022"
			    	lat="80.74421786982952"
			    />

			    <div className={Styles.container}>
				    <div className={Styles.contentCard}>
				        <div className={Styles.title}>
							{this.props.postsData.title}
						</div>
				        <div
					   		className={Styles.cover}
							style={{
				              backgroundSize: `cover`,
				              backgroundImage: `url(${this.props.postsData.cover})`
				            }}
						>
						    <div className={Styles.title}>
								{this.props.postsData.title}
							</div>
						</div>

						<div 
							className={Styles.content}
				            dangerouslySetInnerHTML={{ __html: this.props.postsData.contentHtml }} 
				        />

				        <div className={Styles.tagLine}>
							{this.props.postsData.tags.map(
								(item, index) => <div className={Styles.tag}>{item}</div>
							)}
						</div>
				       
			        </div>
			        
		        </div>
			</div>
		)
	}
}