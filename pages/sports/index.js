import { css } from '@emotion/react';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../Component/Layout';

const productLayout = css`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
`;
const heading = css`
  margin: 64px 0 0 0;
  font: bold;
  justify-content: center;
  text-align: center;
  font-size: 32px;
`;

const frontPage = css`
  justify-content: center;
  text-align: center;
  background-image: url('/space.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
  width: 100%;
  height: 100%;
`;

const singleImage = css`
  display: flex;
  padding: 0px 30px;
  margin: 24px;
  position: relative;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  border: 2px solid rgb(229, 232, 235);
`;
const formStyles = css`
  label {
    display: block;
  }
`;

export default function RegisterPage(props) {
  const [sportList, setSportList] = useState(props.sports);
  const [name, setName] = useState('');
  const matchList = props.matches;
  async function createSport() {
    const sportResponse = await fetch(`/api/sports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const sport = await sportResponse.json();
    const newState = [...sportList, sport];
    setSportList(newState);
    setName('');
  }
  console.log('sportlist front', sportList);
  async function deleteSport(id) {
    const sportResponse = await fetch(`/api/sports/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deletedSport = await sportResponse.json();
    const newState = sportList.filter((sport) => sport.id !== deletedSport.id);
    setSportList(newState);
  }
  return (
    <main css={frontPage}>
      <Layout>
        <form
          css={formStyles}
          onSubmit={async (event) => {
            await event.preventDefault();
          }}
        >
          <h2>Add a Sport Competition </h2>
          <label>
            Sport Name:
            <br />
            <input
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />
          </label>

          <button style={{ marginTop: '10px' }} onClick={() => createSport()}>
            Register
          </button>
        </form>
        <div>
          <h2 css={heading}>Sport Category</h2>
          <div style={{ display: 'flex' }}>
            {sportList.map((sport) => {
              // actually props.liked user
              return (
                <div
                  key={`user-li-${sport.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    paddingRight: '50px',
                  }}
                >
                  <Link href={`/sports/${sport.id}`}>
                    <a>
                      <p>{sport.name}</p>
                    </a>
                  </Link>

                  <button
                    onClick={() => {
                      deleteSport(sport.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 css={heading}>Full Matches Schedule</h2>
          <div>
            <table>
              <tr>
                <th
                  style={{
                    paddingRight: '100px',
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    paddingRight: '100px',
                  }}
                >
                  Time
                </th>
                <th
                  style={{
                    paddingRight: '100px',
                  }}
                >
                  Location
                </th>
                <th
                  style={{
                    paddingRight: '100px',
                  }}
                >
                  Match
                </th>
              </tr>
            </table>
            {matchList.map((match) => {
              return (
                <div key={`match-li-${match.id}`}>
                  <table>
                    <tr>
                      <td
                        style={{
                          paddingRight: '80px',
                        }}
                      >
                        {match.date}
                      </td>
                      <td
                        style={{
                          paddingRight: '80px',
                        }}
                      >
                        {match.time}
                      </td>
                      <td
                        style={{
                          paddingRight: '80px',
                        }}
                      >
                        {match.location}
                      </td>
                      <td
                        style={{
                          paddingRight: '80px',
                        }}
                      >
                        {match.matchname}
                      </td>
                    </tr>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </main>
  );
}

export async function getServerSideProps() {
  const { getSports } = await import('../../util/database');
  const sports = await getSports();

  const { getMatches } = await import('../../util/database');
  const matches = await getMatches();
  console.log('getsports', getSports);
  return {
    props: {
      sports,
      matches,
    },
  };
}
