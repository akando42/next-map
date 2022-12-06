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
		this.loadMap()
	}

	render(){
		return (
			<div 
				className={Styles.map} 
				ref={this.mapContainer}>
			</div>
		)
	}
}