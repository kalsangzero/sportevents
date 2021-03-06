import Head from 'next/head';
import Layout from '../Component/Layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Home Page</title>
        </Head>
        <div className={styles.container}>
          <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>
              Welcome to <a href="/.">Sportinary</a>
            </h1>

            <p className={styles.description}>
              expereince Sports like never before
            </p>

            <div className={styles.grid}>
              <a href="./sports" className={styles.card}>
                <h2>Events</h2>
                <p>Sport events with date, time and other information</p>
              </a>

              <a href="./news" className={styles.card}>
                <h2>News</h2>
                <p>Get the latest and most exciting Sport news!</p>
              </a>

              <a href="./contact" className={styles.card}>
                <h2>Contact</h2>
                <p>Any Questions and Inquiries to be submitted?</p>
              </a>

              <a href="./register" className={styles.card}>
                <h2>New User??</h2>
                <p>Instant Registration available here</p>
              </a>
            </div>
          </main>
        </div>
      </Layout>
    </div>
  );
}
