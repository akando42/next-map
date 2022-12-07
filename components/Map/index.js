import {Component} from 'react'
import Styles from "./map.module.css"
import mapboxgl from '!mapbox-gl';
import React from 'react'

mapboxgl.accessToken = 'pk.eyJ1IjoiaGlsbG9kZXNpZ24iLCJhIjoiY2w1aXhxcm5pMGIxMTNsa21ldjRkanV4ZyJ9.ztk5_j48dkFtce1sTx0uWw';

export default class Map extends Component {
	constructor(props){
		super(props);
		this.state = {
			lat: props.lat,
      		lng: props.lng,
      		zoom: props.zoom,
      		myMap: null
		}

		this.mapContainer = React.createRef();
	}


	loadMap(props){
		const { lng, lat, zoom } = this.state;
	    const map = new mapboxgl.Map({
	        container: this.mapContainer.current,
	        style: 'mapbox://styles/mapbox/streets-v11',
	        center: [lng, lat],
	        zoom: zoom
	    });

	    
	}

	componentDidMount(){
		this.setState({
			lng: this.props.lng,
			lat: this.props.lat,
			zoom: this.props.zoom
		})

		console.log(
			this.props.lat, this.props.lng, this.props.zoom
		)


		this.loadMap()
	}

	render(){
		return (
			<div 
				style={{
					width: `${this.props.width}`,
					height: this.props.height
				}}

				className={Styles.map} 
				ref={this.mapContainer}>
			</div>
		)
	}
}