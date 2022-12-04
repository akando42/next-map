import { Component } from "react" 
import Styles from "./expand_card.module.css"

export default class OverlayCard extends Component {
	render(){
		return (
			<div
			    className={Styles.container}
			    style={{
			       backgroundImage: `url(${this.props.item.image_url})`,
			    }}
			>	
				<div className={Styles.details}>		   
					<div className={Styles.name}>
					   {this.props.item.name}
					</div>
					<div className={Styles.price}>
						{this.props.item.price} VNĐ
					</div>
				</div>
			</div>
		)
	}
}