import {Component} from "react"
import Link from 'next/link'
import Styles from "./docPage.module.css"

export default class DocPage extends Component {
	constructor(props){
		super(props)

		this.countHTML = this.countHTML.bind(this)
		this.updatePage = this.updatePage.bind(this)
	}

	async countHTML(){
		let htmlContent = this.props.pageContent
		let count = htmlContent.length

		console.log(htmlContent, length)
	}

	async updatePage(){
		console.log("Updating Page")
	}

	componentDidMount(){
		this.countHTML()
	}

	render(){
		return(
			<div className={Styles.container}>
				<div className={Styles.pageContainer}>
					<div 
						className={Styles.content}
	            		dangerouslySetInnerHTML={{ 
	            			__html: this.props.pageContent 
	           			}} 
					/>
				</div>
				<div className={Styles.editorContainer}>
					<textarea 
						type="text"
						value={this.props.pageMarkdown}
						onChange={this.updatePage}
						className={Styles.editor}
					/>
				</div>
			</div>

		)
	}

}