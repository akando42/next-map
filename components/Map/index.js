import {Component} from 'react'
import Styles from "./map.module.css"
import mapboxgl from '!mapbox-gl';
import React from 'react'

mapboxgl.accessToken = 'pk.eyJ1IjoiZG92aWV0aG9hbmciLCJhIjoiY2trcDVhbTNiMmh1ZDJucGdyNngxbTdwbCJ9.n88AzgieSmxI15tbp8Cgpg';

export default class Map extends Component {
	constructor(props){
		super(props);
		this.state = {
			lat: 12.74421786982952,
      		lng: 90.09105767050022,
      		zoom: 1.2,
      		myMap: null
		}

		this.mapContainer = React.createRef();
	}


	loadMap(){
		const { lng, lat, zoom } = this.state;
	    const map = new mapboxgl.Map({
	        container: this.mapContainer.current,
	        style: 'mapbox://styles/mapbox/streets-v11',
	        center: [lng, lat],
	        zoom: zoom
	    });

	    this.setState({ 
     	   myMap: map
     	})
	}

	componentDidMount(){
		console.log(
			this.props.height, 
			this.props.width
		)

		this.setState({
			lng: this.props.lng,
			lat: this.props.lat,
			zoom: this.props.zoom
		})

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