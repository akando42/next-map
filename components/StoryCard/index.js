import {Component} from "react"
import Link from 'next/link'
import Styles from "./story_card.module.css"

export default class StoryCard extends Component {

	constructor(props){
		super(props)
	}

	render(){
		return (
			<Link href={this.props.item.path}>
				<div 
					className={Styles.container}
					style={{
					       backgroundImage: `url(${this.props.item.cover})`
					}}
					onMouseEnter={this.props.flyTo}
					onTouchStart={this.props.flyTo}
					
                    onMouseOut={this.props.zoomOut}
                    onTouchEnd={this.props.zoomOut}

                    data-lat={this.props.item.lat}
                    data-lng={this.props.item.lng}
				>
					<div className={Styles.overlay}>
						 <div className={Styles.date}>
							{this.props.item.date}
						</div>
						<div className={Styles.title}>
							{this.props.item.title}
						</div>
					</div>
				</div>
			</Link>
		)
	}
}