import {Component} from 'react'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../libs/posts'
import path from "path"
import Styles from "../../styles/Video.module.css"


const postsTopic = "public/content/posts"
const postsDirectory = path.join(process.cwd(), postsTopic)
const getTrunks = function(contents){
	let trunks = contents.split(/\r?\n/);
	let tweetText = []
	let tweetImage = []

	for(let trunk of trunks){
		if (trunk == ''){
			console.log("EMPTY", trunk)
			continue;
		} else if (trunk.startsWith("##")){
			console.log("TITLE", trunk)
			continue;
		} else {
			let data = {}
			if(trunk.startsWith("!")){
				data.type = 'image'
				data.content = trunk 
				let re = /\((.*)\)/;
				data.link = trunk.match(re)[1]
				tweetImage.push(data)
			} else {
				data.type = 'text'
				data.content = trunk 
				data.length = trunk.length
				tweetText.push(data)
			}
		}
	}

	let tweets = []

	console.log(`There are ${tweetImage.length} images and ${tweetText.length} paragraph in the text`)

	for (let i = 0; i < tweetText.length; i++) {
		let tweet = {}
		tweet.id = i
		tweet.image = tweetImage[i]
		tweet.text = tweetText[i]
		tweets.push(tweet)
	}

	console.log(tweets)
	return tweets
}

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

export default class Video extends Component {
	constructor(props){
		super(props)
		this.setContent = this.setContent.bind(this)
		this.state = {
			thoughts: []
		}
	}

	async setContent(){
		let thoughts = getTrunks(this.props.postsData.content)
		this.setState({
			thoughts: thoughts 
		})

		console.log("THOUGHTS", this.state.thoughts)
	}

	componentDidMount(){
		this.setContent()
	}

	render(){
		return (
			<div className={Styles.main}>
				<Head></Head>
				<h1> {this.props.postsData.title} </h1>
				<div className={Styles.videoContainer}>
					<div className={Styles.slide}>
						{ 
							this.state.thoughts.map((thought) => 
								<div className={Styles.card}>
									{ thought.image ? 
										<div 
											className={Styles.image}
											style={{backgroundImage: `url(${thought.image.link})`}} 
										>
											<div className={Styles.idContainer}>  
												<div className={Styles.id}>{thought.id} </div>
											</div>
										</div>:<div>NO Image</div>
									}
									<div className={Styles.text}> 
										{thought.text.content} 
									</div>
								</div>
								
							)
						}
					</div>
				</div>
			</div>
		)
	}
}