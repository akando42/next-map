import React from 'react'
import axios from 'axios'
import Styles from './markdown.module.css'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

export default class Markdown extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: "",
			content: {},
			assets: [], 
			previewing: false,
			showingAssets: false
		}

		this.updateName = this.updateName.bind(this)
		this.updateContent  = this.updateContent.bind(this)
		this.saveMarkdownChange = this.saveMarkdownChange.bind(this)
		this.showPreview = this.showPreview.bind(this)
		this.showEditor = this.showEditor.bind(this)
		this.showAssets = this.showAssets.bind(this)
	}

	async showPreview(){
		let content = this.state.content
		const htmlContent = await remark()
		    .use(html)
		    .process(content)

		this.setState({
			previewing: true, 
			htmlContent: htmlContent
		})
	}

	async showEditor(){
		this.setState({
			previewing: false
		})
	}

	async getContent(){
		let data = await this.props.parseMarkdown()

		let name = (this.props.markdownName  === "new") 
			? this.props.markdownName + "_" + data.markdownID + ".md"
			: this.props.markdownName

		console.log("MARKDOWN NAME\n", name);
		// console.log("MARKDOWN DATA", data);

		const metaData = matter(data.data)
		// console.log(metaData)

		const htmlContent = await remark()
		    .use(html)
		    .process(metaData.content)

		// console.log(htmlContent)

		this.setState({
			name: name, 
			path: data.path,
			mID: data.markdownID, 
			rawMarkdown: data.data,
			content: metaData.content, 
			matter: metaData.matter,
			htmlContent: htmlContent
		})
	}

	async updateName(e){
		let newName = e.target.value
		console.log(
			"Updating Name", 
			newName
		)

		this.setState({
			name: newName
		})
	}

	async updateContent(event){
		let rawMarkdown = event.target.value
		const metaData = matter(rawMarkdown)
		console.log("Updating Content\n")

		this.setState({
			content: metaData.content, 
			rawMarkdown: rawMarkdown
		})
	}

	async saveMarkdownChange(event){
		let data_pac = {
			name: this.state.name, 
			path: this.state.path, 
			data: this.state.rawMarkdown,
			secret: event.target.dataset.secret
		}
		
		console.log("SAVING DATA", data_pac)
		axios.post(`/api/update_md`, data_pac)
			.then(
				(res) => {
					// console.log(res)
					this.props.closeMarkdownEditor()	
				}
			)

		// location.reload()
	}

	async showAssets(){
		console.log("showingAssets ", this.state.showingAssets)
		if (this.state.showingAssets === false ){
			axios.get(`/api/storage_list`)
				.then(res => {
					console.log(res)
					this.setState({
						showingAssets: true, 
						previewing: false,
						assets: res.data.data
					})
				})

			
		} else {
			this.setState({
				showingAssets: false, 
				previewing: false
			})
		}
	}

	async copyLink(event){
		window.navigator.clipboard.writeText(
			event.target.dataset.link
		)

		console.log(
			"Asset Link\n",
			event.target.dataset.link
		)


		console.log(
			"Asset Payload \n",
			event.target.dataset.payload
		)
	}

	async downloadAssets(assetData){
		console.log("assetData")
	}

	componentDidMount(){
		this.getContent()
	}

	render(){
		return (
			<div className={Styles.markdownContainer}>
				<div className={Styles.controlBox}>
					{ 
						this.state.previewing
							?  	<div></div>
							:   <div 
									className={Styles.controlButton}
									onClick={this.showAssets}
								> 
									Assets
								</div>
					}

					{ 
						this.state.previewing
						?	<div 
								className={Styles.controlButton}
								onClick={this.showEditor}
							>
								Edit
							</div>
						: 	<div 
								className={Styles.controlButton}
								onClick={this.showPreview}
							>
								Preview
							</div>
					}

					
					
					<div 
						className={Styles.controlButton}
						onClick={this.saveMarkdownChange}
						data-secret={this.props.secretStatus}
					>
						Save 
					</div>

					<div 
						className={Styles.controlButton}
						onClick={this.props.closeMarkdownEditor}
					>
						Cancel 
					</div>
				</div>

				<div className={Styles.title}>
					<input 
						type="text"
						value={this.state.name}
						onChange={this.updateName}
						className={Styles.markdownTitle}
					/>
				</div>
				
				{ this.state.previewing 
					?   <div 
							className={Styles.content}
							dangerouslySetInnerHTML={{ __html: this.state.htmlContent }} 
						/>	

					: 	<div className={Styles.assetListing}>
							{
								this.state.showingAssets
								?	<div className={Styles.assetList}>							
										{
											this.state.assets
												.sort((a, b) => {
													if (a.timeCreated > b.timeCreated) {
														return -1;
													}
													if (a.timeCreated < b.timeCreated) {
														return 1;
													}
													return 0;
					  							})
												.map(asset => {
												return (
													<div className={Styles.mediaAsset}>
														<img 
															src={asset.mediaLink} 
															className={Styles.mediaImage}
														/>
														<div
															className={Styles.copyLink}
															data-link={asset.mediaLink}
															data-payload={asset}
															onClick={this.copyLink}
														> 
															Copy 
														</div>
													</div>
												)
											})
										}
									</div>
								:   <textarea
										className={Styles.contentEditor}
										onChange={this.updateContent}
										value={this.state.rawMarkdown}
									/>
							}
						</div>
				}
			</div>
		)
	}
}