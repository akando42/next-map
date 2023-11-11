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
		this.nextSlide = this.nextSlide.bind(this)
		this.setActiveSlide = this.setActiveSlide.bind(this)
		this.startPlaying = this.startPlaying.bind(this)
		this.stopPlaying = this.stopPlaying.bind(this)

		this.state = {
			thoughts: [], 
			activeThought: {
				image: '',
				text: '',
				id: 0
			},
			activeIndex: 0, 
			playing: false
		}
	}

	async setContent(){
		let thoughts = getTrunks(this.props.postsData.content)
		this.setState({
			thoughts: thoughts,
			activeThought: thoughts[0],
			totalSlides: thoughts.length,
			activeIndex: 0,
		})

		// console.log("THOUGHTS", this.state.thoughts)
	}

	async setActiveSlide(event){
		let targetID = event.target.id;
		let activeIndex = targetID.split("_").pop();
		// let button = document.getElementById(targetID);
		// button.style.transform = "scale(1.3)";
		this.stopPlaying();
		console.log("SELECTED ", activeIndex);
		this.setState({
			activeThought: this.state.thoughts[activeIndex],
			activeIndex: activeIndex
		})
	}

	async nextSlide(){
		if (this.state.activeIndex > this.state.totalSlides - 2){
			let activeIndex = 0;
			console.log("ACTIVE ", activeIndex);
			this.setState({
				activeThought: this.state.thoughts[activeIndex],
				activeIndex: activeIndex
			})
		} else {
			let activeIndex = parseInt(this.state.activeIndex) + 1;
			console.log("ACTIVE ", activeIndex);
			this.setState({
				activeThought: this.state.thoughts[activeIndex],
				activeIndex: activeIndex
			})
		}
	}

	async stopPlaying(){
		var music = document.getElementById('music')
		music.pause()

		clearInterval(this.state.interval)
		this.setState({
			playing: false
		})
	}

	async startPlaying(){
		var music = document.getElementById('music')
		music.play()
		var playInterval  = setInterval(() => {
			this.nextSlide()
		}, 21000)

		this.setState({
			playing: true, 
			interval: playInterval
		})
	}

	componentDidMount(){
		this.setContent()
	}

	render(){
		let thought = this.state.activeThought
		console.log(thought)

		return (
			<div className={Styles.main}>
				<Head></Head>
				<h1> {this.props.postsData.title} </h1>

				<div className={Styles.videoContainer}>
					<div className={Styles.slide}>
						<div className={Styles.card} onClick={this.nextSlide}>
							{ 
								this.state.activeThought ?
								<div 
									className={Styles.image}
									style={{backgroundImage: `url(${this.state.activeThought.image.link})`}} 
								>
									<div className={Styles.idContainer}>  
										<div className={Styles.id}>{this.state.activeThought.id} </div>
									</div>
									
								</div>
								:
								<div>NO Image</div>
							}
							<div className={Styles.text}> 
								{this.state.activeThought.text.content} 
							</div>
						</div>
					</div>

					<div className={Styles.slideControl}>
						{ this.state.thoughts.map(thought => 
							<div 
								className={Styles.slideButton} 
								onClick={this.setActiveSlide}
								id={`button_${thought.id}`}
							>
								{thought.id}
							</div>
						)}
					</div>

				</div>
				{ this.state.playing ? 
					<div className={Styles.stopButton} onClick={this.stopPlaying}>
						STOP
					</div>
				  :
				  	<div className={Styles.playButton} onClick={this.startPlaying}>
						PLAY
					</div>
				}
				<audio className={Styles.audio}  id="music">
					<source src="https://storage.googleapis.com/spykman-world/Musics/Stark_Mix.m4a" type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>
				
			</div>
		)
	}
}