import Hls from "hls.js"
import Head from "next/head"
import {Component} from "react"
import Script from "next/script"
import StreamStyles from "./stream_player.module.css"

export default class StreamPlayer extends Component {
	constructor(props){
		super(props)
		this.playStream = this.playStream.bind(this);
		this.startStream = this.startStream.bind(this);

		this.state = {
			videoJS: false, 
		}
	}

	async playStream(){
	    console.log("playing STREAM with streamJS");

	  	var player = videojs('stream_player');
	  	player.src({
	  		src: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8",
	  		type: 'application/x-mpegURL',
	  		withCredentials: false
	  	})

	  	player.play();
	}

	async startStream(player_id){
	    var streamURL = this.props.stream_url;

	    var streamPlayer = document.getElementById(player_id);
	    if (streamPlayer.canPlayType('application/vnd.apple.mpegurl')) {
	      
	      streamPlayer.src = streamURL;
	      streamPlayer.play();

	    } else if(Hls.isSupported()){
	      
	      var hls = new Hls();
	      hls.attachMedia(streamPlayer);

	      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
	        hls.loadSource(streamURL);

	        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
	          console.log("PARSED HLS Successfully");
	          console.log( 'manifest loaded, found ' + data.levels.length + ' quality level');
	        });
	      });

	      streamPlayer.play();
	    }
  	}

  	componentDidUpdate(){
  		this.startStream("stream_player")
  	}

	render(){
		return (
			<div className={StreamStyles.streamBox}>
				<Head>
				  <link href="https://unpkg.com/video.js/dist/video-js.css" rel="stylesheet" />          
				</Head>
				<div className={StreamStyles.liveButton}>
					LIVE
				</div>

				{ this.state.videoJS 
					? (
						<video 
					      id="stream_player" 
					      className={`video-js vjs-default-skin ${StreamStyles.streamer}`}
					      onClick={this.playStream}
					      width= "100vw"
					      data-setup='{}'
					    >
					   	</video>
				   	) 	
				   	: (<video 
					   	id="stream_player" 
				        className={StreamStyles.streamer}
				        autoPlay
					>
					</video>
					)
				}
			   

			   	<Script src="https://unpkg.com/video.js/dist/video.js"></Script>
        		<Script src="https://unpkg.com/videojs-contrib-hls/dist/videojs-contrib-hls.js"></Script>
			</div>
		)
	}
}
