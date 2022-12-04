import { Component } from "react" 
import OverlayStyles from "./overlay_card.module.css"

export default class OverlayCard extends Component {
	render(){
		return (
			<div
			    className={OverlayStyles.container}
			    style={{
			       backgroundImage: `url(${this.props.item.image_url})`,
			    }}
			>	
				<div className={OverlayStyles.details}>		   
					<div className={OverlayStyles.name}>
					   {this.props.item.name}
					</div>
					
					<div className={OverlayStyles.price}>
						{this.props.item.price}
					</div>
				</div>
			</div>
		)
	}
}