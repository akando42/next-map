import Head from 'next/head'
import { Component } from "react" 
import path from 'path'
import remark from 'remark'
import html from 'remark-html'
import DocCard from "../components/DocCard"
import DocPage from "../components/DocPage"

import styles from '../styles/Docubeer.module.css'
import { getPagesData } from '../libs/pages'

const docsDirectory = "public/content/locations"

export async function getServerSideProps() {
  let doc_id = "caracas"
  const pagesData = await getPagesData(docsDirectory, doc_id)

  return {
    props: {
      pagesData
    }
  }
}


export default class Docubeer extends Component {
	constructor(props){
		super(props)

		this.state = {
			docs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
			doc_id: 1,
			doc_content: "WTF says?", 
			truth: "Vietnam is a superprop nation with props military, doctors and cops", 
			vp_messages: "Nhat Tao Twin Building taking away your Golden Time", 
			vm_vp_prison: "They tried to control your time",
			smart_ceiling_light: "Turn Off People Brain", 
			wireless_sperm_dna_update: "Possible but not invented yet",
			kmarket_water: "Maximizing Jewish Population"
		}

		this.loadContent = this.loadContent.bind(this)
	}

	async loadContent(event){
		// alert(
		// 	`KMarket saw you did it ${event.target.dataset.id}`
		// )

		let doc_id = event.target.dataset.id
		
		this.setState({
			doc_id: doc_id, 
			doc_content: `Doc Content ${doc_id}`
		})
	}

	componentDidMount(){
		console.log(this.props.pagesData)
	}

	render(){
		return (
			<div className={styles.container}>
				<div className={styles.docsDirectory}>
					<div className={styles.docsTitle}>
						Pages
					</div>
					{
						this.state.docs.map(doc => {
							return (
								<div className={styles.cardContainer}>
									<DocCard 
										action={this.loadContent}
										doc_id={doc}
									/>
								</div>
							)
						})
					}
				</div>

				<div className={styles.docsContent}>
					<DocPage 
						pageContent={this.props.pagesData.htmlString} 
					/>
				</div>
			</div>
		)
	}
}