import { Component } from "react" 
import { getAllPostIds, getPostData } from '../libs/posts'
import path from "path"
import Styles from '../styles/Post.module.css'
import Map from "../components/Map"
import Logo from "../components/Logo"
import Head from 'next/head'

const postsTopic = "public/content/posts"
const postsDirectory = path.join(process.cwd(), postsTopic)

export async function getStaticProps({ params }) {
  const postsData = await getPostData(postsDirectory, params.id)
  const coverImage = "https://geogenetics.dystillvision.com/"+postsData.cover
  return {
    props: {
      postsData, 
      coverImage
    }
  }
}

export async function getStaticPaths(){
	const paths = getAllPostIds(postsDirectory)
    // console.log("our static paths is", paths)
  
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
				<Head>
			        <title>{this.props.postsData.title}</title>
			        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

			        <meta name="twitter:card" content="summary_large_image" />
			        <meta name="twitter:site" content="@mikedoconsulter" />
					<meta name="twitter:creator" content="@mikedoconsulter" />
					<meta name="twitter:title" content={this.props.postsData.title} />
					<meta name="twitter:description" content={this.props.postsData.summary} />
					<meta name="twitter:domain" content="geogenetics.mikedoconsulting.com" />
					<meta name="twitter:image" content={this.props.coverImage} />
			    </Head>

				<Logo />
			    <Map 
			    	width="100vw" 
			    	height="50vh" 
			    	data={this.props.postsData}
			    	lng={this.props.postsData.lng}
			    	lat={this.props.postsData.lat}
			    	zoom={this.props.postsData.zoom}
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
								(item, index) => <div key={index} className={Styles.tag}>{item}</div>
							)}
						</div>
				       
			        </div>
			        
		        </div>
			</div>
		)
	}
}