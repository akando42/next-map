import { Component } from "react" 
import Styles from "./opacity_card.module.css"

export default class OpacityCard extends Component {
	constructor(props){
		super(props)
	}	
	componentDidMount(){
		console.log("LOADING ITEM", this.props.item);
	}

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
						{this.props.item.price} 
					</div>
				</div>
			</div>
		)
	}
}