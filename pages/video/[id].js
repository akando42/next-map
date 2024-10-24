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
		if (trunk == ' ' || trunk == ''){
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
				let words = trunk.split(/\s+/g)
				data.wordCount = words.length
				data.duration = Math.round(60/100 * words.length)
				data.length = trunk.length
				tweetText.push(data)
			}

		}
	}

	let tweets = []

	console.log(
		`There are ${tweetImage.length} images and 
		${tweetText.length} paragraph in the text`
	)

	if (tweetImage.length === tweetText.length){
		console.log("No PARSING Error")
	} else {
		console.log("Tweet Text ERROR",tweetText)
	}
	

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

		this.voiceOverText = this.voiceOverText.bind(this)
		this.startScreenCapture = this.startScreenCapture.bind(this)

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

		console.log("THOUGHTS", this.state.thoughts)
	}

	async setActiveSlide(event){
		let targetID = event.target.id;
		let activeIndex = targetID.split("_").pop();
		// let button = document.getElementById(targetID);
		// button.style.transform = "scale(1.3)";
		let activeText = this.state.thoughts[activeIndex].text.content;
		console.log("THOUGHT", activeIndex, activeText);

		this.voiceOverText(activeText)
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
			let activeText = this.state.thoughts[activeIndex].text.content;
			console.log("THOUGHT", activeIndex, activeText);

			this.voiceOverText(activeText)

			this.setState({
				activeThought: this.state.thoughts[activeIndex],
				activeIndex: activeIndex
			})
		} else {
			let activeIndex = parseInt(this.state.activeIndex) + 1;
			let activeText = this.state.thoughts[activeIndex].text.content;
			console.log("THOUGHT", activeIndex, activeText);
			this.voiceOverText(activeText)
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

	async toggleFullScreen(){
		let deck = document.getElementById('slide-deck')
		console.log("Sliding deck")
		if (deck.requestFullscreen)  {
		 	deck.requestFullscreen(); 
		}
	}
	
	async voiceOverText(text){
		const synth = window.speechSynthesis;
		let voices = synth.getVoices();
		console.log("VOICES", voices)
		let utterance = new SpeechSynthesisUtterance(text);
		utterance.voice = voices[9]
		console.log(utterance);
		synth.speak(utterance);
	}

	async startScreenCapture(){
		const displayMediaOptions = {
			video: {
				displaySurface: "browser",
			},
			audio: {
				suppressLocalAudioPlayback: false,
			},
			preferCurrentTab: false,
			selfBrowserSurface: "exclude",
			systemAudio: "include",
			surfaceSwitching: "include",
			monitorTypeSurfaces: "include",
		}

		let captureStream = null;
		try {
		    captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
		} catch (err) {
		    console.error(`Error: ${err}`);
		}
		
		return captureStream;
	}

	componentDidMount(){
		this.setContent()
	}

	render(){
		let thought = this.state.activeThought
		
		return (
			<div className={Styles.main}>
				<Head></Head>

				<div className={Styles.videoContainer}>
					<div className={Styles.text}> 
						{this.state.activeThought.text.content} 
					</div>

					<div className={Styles.slide}>
						<h1> {this.props.postsData.title} </h1>

						<div 
							className={Styles.card} 
							onClick={this.nextSlide}
						>
							{ 
								this.state.activeThought ?
								<div  className={Styles.slideContainer}>
									<div className={Styles.idContainer}>  
										<div className={Styles.id}>
										    {this.state.activeThought.id} 
										</div>
										<div className={Styles.textStats}>
											{this.state.activeThought.text.wordCount} words 
										</div>
										<div className={Styles.textStats}>
											{this.state.activeThought.text.duration} seconds 
										</div>
										<div 
											onClick={this.toggleFullScreen}
											className={Styles.fullScreen}
										> 
											<img 
												className={Styles.fullScreenIcon}
												src="/fullScreen.svg" 
											/>
										</div>
									</div>
									<div 
										id="slide-deck"
										className={Styles.image}
										style={{backgroundImage: `url(${this.state.activeThought.image.link})`}} 
									>	
									</div>
								</div>
								:
								<div>NO Image</div>
							}
						</div>

						{ 
							this.state.playing 
								?   <div className={Styles.stopButton} onClick={this.stopPlaying}>
										STOP
									</div>
						  		: 	<div className={Styles.playButton} onClick={this.startPlaying}>
										PLAY
									</div>
						}

						<div 
							className={Styles.screenCapture}
							onClick={this.startScreenCapture}
						>	
							Screen Capture 
						</div>
					</div>

					<div className={Styles.slideControl}>
						{   
							this.state.thoughts.map((thought) => 
								{
									let thumb
									if (thought.image){
										thumb = thought.image.link
									} else {
										thumb = ""
									}
									return  (
										<div 
											className={Styles.slideButton} 
										>
											<div 
												className={Styles.buttonID}
												onClick={this.setActiveSlide}
												id={`button_${thought.id}`}
											>
												{thought.id}
											</div>
											<div 
												className={Styles.buttonThumbnail}
												style={{
													backgroundImage: `url(${thumb})`
												}} 
											>	
											</div>
										</div>
									)
								}
							)
						}
					</div>
				</div>

				<audio className={Styles.audio}  id="music">
					<source src="https://storage.googleapis.com/spykman-world/Musics/Stark_Mix.m4a" type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>
			</div>
		)
	}
}