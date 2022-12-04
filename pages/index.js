import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Map</title>
        <meta name="description" content="Location-based Stories" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      </main>

      <footer className={styles.footer}>
        <a
          href=""
          target="_blank"
        >
          Genetics and Geography Patterns {'Hoang Do'}
        </a>
      </footer>
    </div>
  )
}
