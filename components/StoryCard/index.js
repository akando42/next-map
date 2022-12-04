import {Component} from "react"
import Styles from "./story_card.module.css"

export default class StoryCard extends Component {
	render(){
		return (
			<div 
				className={Styles.container}
				 style={{
				       backgroundImage: `url(${this.props.item.image_url})`
				 }}
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
		)
	}
}