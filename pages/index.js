import Head from 'next/head'
import Image from 'next/image'
import { Component } from "react" 
import styles from '../styles/Home.module.css'
import StoryCard from "../components/StoryCard"
import Map from "../components/Map"

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
          'image_url': 'https://spykman.mikedoconsulting.com/static/6eb8dac791348816c78fe0d66b23b497/af5c2/spykman-world-artOfEightLimbs.webp',
          'title': 'Thailand - A Forever Puppet or Independent at Last',
          'date':'25.01'
        },
        {
          'image_url':'https://spykman.mikedoconsulting.com/static/d929a7561039488a6007efbce692ba1b/7e926/spykman-world-benh_vien_108_zing_9.webp',
          'title':'Military Medicine - the Innovator of Medical Industry',
          'date':'02.02'
        },
        {
          'image_url':'https://spykman.mikedoconsulting.com/static/b2b6ff3f8fb18af1ebc07c7bd53fc37b/7e926/spykman-world-island-nation.webp',
          'title':'An Island Nation And the Geographical Constraint That Trigger Evolution',
          'date':'02.15'
        },
        {
          'image_url':'https://spykman.mikedoconsulting.com/static/6a4e865269f3c16363aeeaecfcff2209/11d17/spykman-world-permanent.webp',
          'title':'Richard Nixon and the Art of Manipulations',
          'date':'02.21'
        },
        {
          'image_url':'https://spykman.mikedoconsulting.com/static/db66b1561dcc701a91c8df55192a9278/fabdf/spykman-world-who_let_the_dog_out.webp',
          'title':'Rimland Met Heartland - An Impossible Alliance',
          'date':'02.29'
        },
        {
          'image_url':'https://spykman.mikedoconsulting.com/static/e3a248653ebcebb9ebbd3e07ab738c05/64c2a/spykman-world-going-forward-to-keep-balance.webp',
          'title':'Range the Evolution of Artilery',
          'date':'03.13'
        },
        {
          'image_url':'https://spykman.mikedoconsulting.com/static/f1968ff9736c1b2ac8fcb4bbeb5a67c2/7e926/spykman-world-devil_eggs_in_one_basket.webp',
          'title':'The Inherated Empire Building Formula',
          'date':'06.12'
        },
      ]
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
          <div 
            className={styles.logo}
            style={{
              backgroundColor: `white`,
              backgroundSize: `cover`,
              backgroundImage: `url(logo/version1.png)`
            }}
            >
          </div>
          
          <Map />          
          
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
