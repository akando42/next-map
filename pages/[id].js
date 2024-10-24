import { Component } from "react" 
import { getAllPostIds, getPostData } from '../libs/posts'
import path from "path"
import Styles from '../styles/Post.module.css'
import Map from "../components/Map"
import Logo from "../components/Logo"
import StoryCard from "../components/StoryCard"
import Head from 'next/head'
import Link from 'next/link'

const postsTopic = "public/content/posts"
const postsDirectory = path.join(process.cwd(), postsTopic)

export async function getStaticProps({ params }) {
  console.log("\n\nPARAMS\n\n", params)

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
    console.log("Our static paths are", paths)
  
	return {
		paths,
		fallback: false
	}
}

export default class Post extends Component {
	constructor(props){
		super(props)

		this.state = {
			showingOriginal: true, 
			showingUpdates: false
		}

		this.swapArticle = this.swapArticle.bind(this)
	}

	async swapArticle(){
		this.setState({
			showingOriginal: !this.state.showingOriginal, 
			showingUpdates: !this.state.showingUpdates
		})
	}

	componentDidMount(){}

	render(){
		// console.log("POST DATA", this.props.postsData)

		return (
			<div className={Styles.background}>
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
			    	height="40vh" 
			    	data={this.props.postsData}
			    	lng={this.props.postsData.lng}
			    	lat={this.props.postsData.lat}
			    	zoom={this.props.postsData.zoom}
			    />

			    <div className={Styles.container}>
			    	{
			    		this.state.showingOriginal
			    		?	<div className={Styles.contentCard}>
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

					    :   <div 
								className={Styles.originalCard}
								onClick={this.swapArticle}
								style={{
	      							backgroundImage: `url(${this.props.postsData.cover})`,
	      						}}
							>
								<div className={Styles.updateCover}>
								</div>
								<div className={Styles.updateInfo}>
									<div className={Styles.updateTime}>
										{this.props.postsData.date}
									</div>
									<div  className={Styles.updateTitle}>
										{this.props.postsData.title}
									</div>													
								</div>
							</div>
			    	}
				   
			        
					{
						this.state.showingUpdates 
						? 	<div className={Styles.updatedContentCard}>
						        <div className={Styles.title}>
									{this.props.postsData.updatedArticles[0].title}
								</div>

						        <div
							   		className={Styles.cover}
									style={{
						              backgroundSize: `cover`,
						              backgroundImage: `url(${
						              	this.props.postsData.updatedArticles[0].data.cover}
						              )`
						            }}
								>
								    <div className={Styles.title}>
										{this.props.postsData.updatedArticles[0].data.title}
									</div>
								</div>

								<div 
									className={Styles.content}
						            dangerouslySetInnerHTML={{ 
						            	__html: this.props.postsData.updatedArticles[0].contentHtml 
						           	}} 
						        />

						        <div className={Styles.tagLine}>
									{this.props.postsData.updatedArticles[0].data.tags.map(
										(item, index) => <div key={index} className={Styles.tag}>{item}</div>
									)}
								</div>	
					        </div>

						: 	<div className={Styles.updatedArticles}>
								{   
									this.props.postsData.updatedArticles.map(
										(article, index) => {

											// console.log("NEW ARTICLE", article)
											// console.log("NEW ARTICLE ID", index)

											return(
												<div 
													key={index} className={Styles.updateCard}
													onClick={this.swapArticle}
													style={{
						      							backgroundImage: `url(${article.data.cover})`,
						      						}}
												>
													<div className={Styles.updateCover}>
													</div>
													<div className={Styles.updateInfo}>
														<div className={Styles.updateTime}>
															{article.data.date}
														</div>
														<div>{article.data.title}</div>													
													</div>
												</div>
											)
										}	
									)
								}
							</div>	 
					}
		        </div>
			</div>
		)
	}
}