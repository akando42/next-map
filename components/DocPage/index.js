import {Component} from "react"
import Link from 'next/link'
import Styles from "./docPage.module.css"
import axios from "axios"

export default class DocPage extends Component {
	constructor(props){
		super(props)

		this.state = {
			showingPageEditor: false, 
			showingResearchEditor: false,
			bufferMarkdown: this.props.researchMarkdown,
			bufferResearch: this.props.researchContent
		}

		this.countHTML = this.countHTML.bind(this)
		this.updateMarkdown = this.updateMarkdown.bind(this)

		this.updatePage = this.updatePage.bind(this)
		this.updateResearch = this.updateResearch.bind(this)

		this.showPageEditor = this.showPageEditor.bind(this)
		this.showResearchEditor = this.showResearchEditor.bind(this)
	}

	async countHTML(){
		let htmlContent = this.props.pageContent
		let count = htmlContent.length

		console.log(htmlContent, length)
	}

	async updatePage(){
		console.log("Updating Page")
	}

	async updateResearch(){
		this.setState({
			showingResearchEditor: false, 
		})

		let data_pac = {
			location: this.props.docId,
			author: this.props.researchAuthor, 
			data: this.state.bufferMarkdown
		}

		console.log("Data Pac ", data_pac)

		await axios.post(`/api/markdown`, data_pac).then(res => {
			console.log("Send Markdown Content", res)

			this.setState({
				research_markdown: res.data.content, 
				bufferMarkdown: res.data.content,
				bufferResearch: res.data.htmlString,
			})
		})
	}

	async updateMarkdown(event){
		console.log(event.target.value)
		this.setState({
			bufferMarkdown: event.target.value
		})
	}

	async showPageEditor(){
		this.setState({
			showingPageEditor: !this.state.showingPageEditor
		})
	}

	async showResearchEditor(){
		// location.reload()
		await axios.get(`/api/location?doc_id=${this.props.docId}`)
			.then(res => {
				console.log("RES DATA \n", res)
				this.setState({
					showingResearchEditor: !this.state.showingResearchEditor,
					bufferMarkdown: res.data.researchData.content, 
					bufferResearch: res.data.researchData.htmlString
				})
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
					<div className={Styles.controlPanel}>
						{ 
							this.state.showingResearchEditor 
							? 	<div 
									className={Styles.saveChanges}
									onClick={this.updateResearch}
								> 
									Save Changes 
								</div>
							:	<div 
									className={Styles.showEditor}
									onClick={this.showResearchEditor}
								>
									Show Editor 		
								</div>
						}
					</div>
					{
						this.state.showingResearchEditor
						?   <textarea 
								type="text"
								value={this.state.bufferMarkdown}
								onChange={this.updateMarkdown}
								className={Styles.editorContainer}
							/>
						:   <div className={Styles.researchPanel}>
								<div 
									className={Styles.content}
				            		dangerouslySetInnerHTML={{ 
				            			__html: this.state.bufferResearch
				           			}} 
								/>
							</div>
					}
				</div>
			</div>

		)
	}

}