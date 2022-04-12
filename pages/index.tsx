import type { NextPage } from 'next'

import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
   

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="/">Next.js! Project</a>
        </h1>

        <p className={styles.description}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          
        </p>

   

 

  
      </main>
    </div>
  )
}

export default Home
