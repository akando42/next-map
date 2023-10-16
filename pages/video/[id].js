import {Component} from 'react'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../libs/posts'
import path from "path"

const postsTopic = "public/content/posts"
const postsDirectory = path.join(process.cwd(), postsTopic)

const getTrunks = function(contents){
	let trunks = contents.split(/\r?\n/);
	let tweetText = []
	let tweetImage = []

	for(let trunk of trunks){
		if (trunk == ''){
			continue;
		} else if (trunk.startsWith("##")){
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
	}

	async setContent(){
		let thoughts = getTrunks(this.props.postsData.content)
		this.setState({
			thoughts: thoughts 
		})
	}

	componentDidMount(){
		this.setContent()
	}

	render(){
		return (
			<div>
				<Head></Head>
				<h1> {this.props.postsData.title} </h1>
			</div>
		)
	}
}