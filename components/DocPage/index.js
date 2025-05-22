import {Component} from "react"
import Link from 'next/link'
import Styles from "./docPage.module.css"

export default class DocPage extends Component {
	constructor(props){
		super(props)

		this.state = {
			showingPageEditor: false, 
			showingResearchEditor: false,
		}

		this.countHTML = this.countHTML.bind(this)
		this.updatePage = this.updatePage.bind(this)
		this.showPageEditor = this.showPageEditor.bind(this)
	}

	async countHTML(){
		let htmlContent = this.props.pageContent
		let count = htmlContent.length

		console.log(htmlContent, length)
	}

	async updatePage(){
		console.log("Updating Page")
	}

	async showPageEditor(){
		this.setState({
			showingPageEditor: !this.state.showingPageEditor
		})
	}

	componentDidMount(){
		this.countHTML()
	}

	render(){
		return(
			<div className={Styles.container}>
				<div className={Styles.script}>
					<div 
						className={Styles.showEditor}
						onClick={this.showPageEditor}
					>
						{ 
							this.state.showingPageEditor 
							?   <span> Hide Editor </span>
							: 	<span> Show Editor </span>
						}						
					</div>
					
					{
						this.state.showingPageEditor 
						?	<textarea 
								type="text"
								value={this.props.pageMarkdown}
								onChange={this.updatePage}
								className={Styles.editorContainer}
							/>
						:   <div className={Styles.pageContainer}>
								<div 
									className={Styles.content}
				            		dangerouslySetInnerHTML={{ 
				            			__html: this.props.pageContent 
				           			}} 
								/>
							</div>
					}
					
				</div>
				<div className={Styles.research}>
					<div className={Styles.researchPanel}>
						<div 
							className={Styles.content}
		            		dangerouslySetInnerHTML={{ 
		            			__html: this.props.researchContent
		           			}} 
						/>
					</div>
				</div>
			</div>

		)
	}

}