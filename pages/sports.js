import Head from 'next/head';
import Layout from '../Component/Layout';
import styles from '../styles/Home.module.css';

export default function Sports() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Sports Page</title>
        </Head>
        <div className={styles.container}>
          <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <div>
              <h2>Matches</h2>

              <table>
                <tr>
                  <th>Date</th>
                  <th>Day</th>

                  <th>Time</th>
                  <th>Sport</th>
                  <th>Event</th>
                  <th>Location</th>
                </tr>
                <tr>
                  <td>18.12.2021</td>
                  <td>Saturday</td>
                  <td>18:30</td>
                  <td>Football</td>
                  <td>Salzburg – Sturm</td>
                  <td>Salzburg Stadium</td>
                </tr>
                <tr>
                  <td>23.12.2021</td>
                  <td>Thursday</td>
                  <td>20:00</td>
                  <td>Icehockey</td>
                  <td>KAC - Capitals</td>
                  <td>KAC Icehall</td>
                </tr>
              </table>
            </div>
          </main>
        </div>
      </Layout>
    </div>
  );
}
