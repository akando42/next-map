import {Component} from "react"
import Link from 'next/link'
import Styles from "./docCard.module.css"

export default class DocCard extends Component {

	constructor(props){
		super(props)
		this.loadContent = this.loadContent.bind(this)
	}

	async loadContent(){
		console.log("Loading content")
	}

	render(){
		return (
			<div 
				onClick={this.props.action}
				className={Styles.container}
				data-id={this.props.doc_id}
			>
				DocCard {this.props.doc_id}
			</div>
		)
	}
}