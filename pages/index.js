import Head from 'next/head'
import Image from 'next/image'
import { Component } from "react" 
import styles from '../styles/Home.module.css'
import StoryCard from "../components/StoryCard"
import Map from "../components/Map"
import Logo from "../components/Logo"

import { getSortedPostsData } from '../libs/posts'

const postsDirectory = "public/content/posts"

export async function getStaticProps() {
  const postsData = await getSortedPostsData(postsDirectory)
  return {
    props: {
      postsData
    }
  }
}

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  
 
  componentDidMount(){}

  render(){
    return (
      <div className={styles.container}>
        <Head>
          <title>Next Map</title>
          <meta name="description" content="Location-based Stories" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Logo />
          
          <Map 
            width="100vw"
            height="65vh"
            data={this.props.postsData}
            zoom="2" 
            lng="90.09105767050022"
            lat="12.74421786982952"
          />          
          
          <div className={styles.timeline}>
            { 
                this.props.postsData.map(
                  (item, index) => <StoryCard key={index} item={item} />
                )
            }   
          </div>
        </main>
      </div>
    )
  }
}
