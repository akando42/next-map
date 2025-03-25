import Head from 'next/head'
import { Component } from "react" 
import path from 'path'
import remark from 'remark'
import html from 'remark-html'
import { getAllPostsData } from '../libs/posts'

import styles from '../styles/Book.module.css'

const postsDirectory = "public/content/posts"

export async function getServerSideProps() {
  const postsData = await getAllPostsData(postsDirectory)
  const detailPostsData = await postsData.map(async(data) => {
  	const processedContent = await remark()
      .use(html)
      .process(data.content)

    const contentHtml = await processedContent.toString()
    console.log(contentHtml)
    console.log(data)
    return {
    	...data,
    	contentHtml
    }
  })

  // console.log(detailPostsData)

  // const today = new Date()
  // const todayString = today.toJSON()

  // // console.log(postsData.length)
  // var minDistance = 200
  // var stopIndex = 0

  // function find_start_date(index, item, todayString){
  //   const postDate = item.id
  //   const todayDate = todayString
  //   console.log(postDate, todayDate)
    
  //   const postDateNum = postDate.substring(0,2) + postDate.substring(3,5)
  //   const todayDateNum = todayDate.substring(5,7) + todayDate.substring(8,10)
  //   const time_distance = parseInt(todayDateNum) - parseInt(postDateNum)

  //   if (time_distance > 0 & time_distance < minDistance){
  //       minDistance = time_distance
  //       stopIndex = index
  //   }
  //   // console.log(postDateNum, todayDateNum, time_distance)
  // }

  // postsData.map(
  //   async (item, index) => find_start_date(index, item, todayString)
  // )

  // var pastPosts = postsData.slice(0,stopIndex)
  // var futurePosts = postsData.slice(stopIndex)
  // const datedSortedPosts = futurePosts.concat(pastPosts)

  // console.log(today, stopIndex, datedSortedPosts[0], datedSortedPosts.length)

  return {
    props: {
      postsData
    }
  }
}

export default class Book extends Component {
	constructor(props){
		super(props)
		this.state = {
			posts: [], 
			expands: [
				{
					'name':'WATER AND FARMLAND ABUNDANCE',
					'link':'#12-26'
				}, 
				{
					'name':'ENERGY ABUNDANCE',
					'link':'#08-05'
				},
				{
					'name':'START WITH DEFENSIBLE GEOGRAPHY',
					'link':'#09-02'
				}, 
				{
					'name':'QUIETLY INCREASE NUMBER IN HOSTILE ZONE',
					'link':'#07-24'
				},
				{
					'name':'SINGLE DIRECTION',
					'link':'#02-02'
				}, 
				{
					'name':'BUILD ALLIANCE',
					'link':'#02-21'
				},
				{
					'name':'GENE COMPATIBILITY FOR LONG LASTING ALLIANCE',
					'link':'#07-31'
				},
				{
					'name':'ACHIEVE GENE ISLAND FORTRESS',
					'link':'#01-05'
				},
				{
					'name':'TRAPPING LURING',
					'link':'#03-20'
				},
				{
					'name':'MAKE CALCULATED RISKY EXPERIMENT AT SMALL COST',
					'link':'#07-21'
				}, 
				{
					'name':'INCREASE RISK TOLERANCE WHILE NOT DECREASE SURVIVABILITY',
					'link':'#09-13'
				},
				{
					'name':'CONTINUOUSLY COMPOUND TECH UPGRADES',
					'link':'#07-16'
				}, 
				{
					'name':'MOBILITY UPGRADES ALLOW FASTER EXPANSION',
					'link':'#11-11'
				},
				{
					'name':'MAPPING ALL EARTH GEOGRAPHY',
					'link':'#08-10'
				}, 
				{
					'name':'COMMAND DANGEROUS INHOSPITABLE GEOGRAPHY',
					'link':'#09-13'
				},
				{
					'name':'GENE EXPANSION RIGHT AFTER BREAKTHROUGH TECH UPGRADE',
					'link':'#09-11'
				},
				{
					'name':'MAKE DANGEROUS TOOLS',
					'link':'#07-13'
				},
				{
					'name':'PREEMPTIVE ATTACK',
					'link':'#07-04'
				},
				{
					'name':'FORWARD DEPLOY AT ENEMY DOORSTEP',
					'link':'#07-29'
				},
				{
					'name':'CONSUME COMPETITOR FOR MORE ENERGY',
					'link':'#05-19'
				},
				{
					'name':'REWRITE NATURAL GENE CODE',
					'link':'#03-13'
				}
			],
			compresses: [
				{
					'name':'WMD VIRAL DICEASE',
					'link':''
				}, 
				{
					'name':'DECLINING FERTILITY RATE',
					'link':''
				}, 
				{
					'name':'FOREIGN GENE MASKING AS NATIVE GENE',
					'link':''
				}, 
				{
					'name':'RANDOM SHUFFLE OF GENE GROUPS',
					'link':''
				}, 
				{
					'name':'OVERCOMMITTING FORCES EXPANDING ACROSS CLIMATE LINE',
					'link':''
				}, 
				{
					'name':'FAIL TO GUARD GEOGRAPHICAL GATEWAY',
					'link':''
				}, 
				{
					'name':'LIMITED CLOSED ECOSYSTEM',
					'link':''
				}, 
				{
					'name':'LIMITED ENERGY SOURCES',
					'link':''
				}, 
				{
					'name':'INDEFENSIBLE GEOGRAPHICAL BORDER',
					'link':''
				}, 
				{
					'name':'GEOGRAPHICAL STROKE POINT',
					'link':''
				}, 
				{
					'name':'EXTREME ALTERNATION OF GEOGRAPHICAL ENVIRONMENT',
					'link':''
				}, 
				{
					'name':'FAIL TO FORM STRONG COALITION',
					'link':''
				}, 
				{
					'name':'BORROW SOCIAL ARCHITECTURE',
					'link':''
				}, 
				{
					'name':'COMPETING WITH MORE ADVANCED MOBILITY ENEMY',
					'link':''
				}, 
				{
					'name':'OVERWHELMING SURVEILLANCE FROM ENEMY',
					'link':''
				}, 
				{
					'name':'GENE LOST ITS FREEWILL',
					'link':''
				} 
			],
			currentContentID: '',
			currentContent: '',
			showingContent: false
		}

		this.listPost = this.listPost.bind(this)
		this.loadText = this.loadText.bind(this)
		this.hideText = this.hideText.bind(this)
	}

	async listPost(){
		console.log(this.props.postsData)
		this.setState({
			posts: this.props.postsData
		})
	}

	async loadText(event){
		// console.log(event.target.dataset.content)
		let currentContent = event.target.dataset.content
		let processedContent = await remark()
	      .use(html)
	      .process(currentContent)

    	const contentHtml = processedContent.toString()
    	console.log(contentHtml)
    	this.setState({
    		currentContent: contentHtml,
    		currentContentID: event.target.dataset.contentid, 
    		showingContent: true
    	})
	}

	async hideText(){
		console.log("Hiding Content")
		this.setState({
			currentContent: '',
			currentContentID: '', 
			showingContent: false
		})
	}

	componentDidMount(){
		this.listPost()
	}

	render(){
		return (
			<div className={styles.container}>
				<div className={styles.topSection}>
					<div className={styles.bookSummary}>
						GENE is the natural codes for all life forms
						that can evolve and adapt to acquire increasingly
						more ENERGY for itself and its many copies to 
						overcome GEOGRAPHY challenges
					</div>

					<div className={styles.bookTitle}>
						GeoGen
					</div>
					
					<div className={styles.bookSubtitle}>
						GEN_CONSTANT * Gen_Count 
						<br/>
						- 
						<br/>
						GEO_CONSTANT * Gen_Geography
						<br/>
						= 
						<br/>
						GEN_TOTAL_ENERGY 
					</div>
				</div>

				<div className={styles.table}>
					<div className={styles.expand_outcome}>
							SPEED UP GENE EXPANSION
					</div>
					<div className={styles.expand}>

						{
							this.state.expands.map(expand => {
								return (
									<a href={expand.link} className={styles.do}>
										{expand.name}
									</a>
								)
							})
						}
					</div>
					<div className={styles.compress_outcome}>
							SLOW DOWN GENE EXPANSION
					</div>
					<div className={styles.compress}>
						{
							this.state.compresses.map(compress => {
								return (
									<a href={compress.link} className={styles.do}>
										{compress.name}
									</a>
								)
							})
						}
					</div>
				</div>

				<div className={styles.content}>
					{
						this.state.posts.map(post => {
							return (
								<div className={styles.chapter}>
									<div className={styles.title} id={post.date}>
										{post.title} ({post.date})
									</div>
									<div className={styles.summary}>
										{post.summary} 
									</div>
									{
										this.state.showingContent && (this.state.currentContentID == post.id)
										? 	<div className={styles.fullContent}>
												<div 
										        	className={styles.hideContent}
										        	onClick={this.hideText}
										        >
										        	Hide Content
										        </div>

												<div 
													className={styles.htmlContent}
										            dangerouslySetInnerHTML={{ 
										            	__html: this.state.currentContent
										           	}} 
										        />

										        <div 
										        	className={styles.hideContent}
										        	onClick={this.hideText}
										        >
										        	Hide Content
										        </div>
										        
										    </div>
										: 	<div 
												className={styles.showText}
												onClick={this.loadText}
												data-content={post.content}
												data-contentid={post.id}
											>
												Read More
											</div>
									}
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
}