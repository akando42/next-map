import Head from 'next/head'
import Image from 'next/image'
import { Component } from "react" 
import styles from '../styles/Home.module.css'
import StoryCard from "../components/StoryCard"

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      store_id: '',
      views: 0, 
      playing: false,
      streaming: true,
      items: [
        {
          'image_url':'https://spykman.mikedoconsulting.com/static/f1968ff9736c1b2ac8fcb4bbeb5a67c2/7e926/spykman-world-devil_eggs_in_one_basket.webp',
          'title':'The Inherated Empire Building Formula',
          'date':'06.12.2022'
        },
        {
          'image_url':'https://spykman.mikedoconsulting.com/static/f1968ff9736c1b2ac8fcb4bbeb5a67c2/7e926/spykman-world-devil_eggs_in_one_basket.webp',
          'title':'The Inherated Empire Building Formula',
          'date':'06.12.2022'
        },
        {
          'image_url':'https://spykman.mikedoconsulting.com/static/f1968ff9736c1b2ac8fcb4bbeb5a67c2/7e926/spykman-world-devil_eggs_in_one_basket.webp',
          'title':'The Inherated Empire Building Formula',
          'date':'06.12.2022'
        },
        {
          'image_url':'https://spykman.mikedoconsulting.com/static/f1968ff9736c1b2ac8fcb4bbeb5a67c2/7e926/spykman-world-devil_eggs_in_one_basket.webp',
          'title':'The Inherated Empire Building Formula',
          'date':'06.12.2022'
        },
        {
          'image_url':'https://spykman.mikedoconsulting.com/static/f1968ff9736c1b2ac8fcb4bbeb5a67c2/7e926/spykman-world-devil_eggs_in_one_basket.webp',
          'title':'The Inherated Empire Building Formula',
          'date':'06.12.2022'
        },
        {
          'image_url':'https://spykman.mikedoconsulting.com/static/f1968ff9736c1b2ac8fcb4bbeb5a67c2/7e926/spykman-world-devil_eggs_in_one_basket.webp',
          'title':'The Inherated Empire Building Formula',
          'date':'06.12.2022'
        }
      ]
    }
  }
  
  
  componentDidMount(){
    
  }

  render(){
    return (
      <div className={styles.container}>
        <Head>
          <title>Next Map</title>
          <meta name="description" content="Location-based Stories" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.logo}></div>
          <div className={styles.map}></div>
          <div className={styles.timeline}>
            { 
                this.state.items.map(
                  (item, index) => <StoryCard key={index}  item={item} />
                )
            }   
          </div>
        </main>
      </div>
    )
  }
}
