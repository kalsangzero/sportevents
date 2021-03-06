import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../../Component/Layout';

const frontPage = css`
  justify-content: center;
  text-align: center;
  /* background-image: url('');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat; */
  color: white;
  width: 100%;
  height: 100%;
`;

const registercss = css`
  margin: 130px 0;
`;
const formStyles = css`
  label {
    display: block;
  }
`;
const buttoncss = css`
  padding: 10px 20px;
  font-size: 19px;
  margin-top: 10px;
  border-radius: 5px;
`;

const labelcss = css`
  margin: 10px 0 0 0;
  font-size: 18px;
  input {
    margin-left: 15px;
    padding: 10px 5px;
    outline: none;
    border: 1px solid #8c8f94;
    border-radius: 10px;
  }
  input:focus {
    border-color: #16056b;
  }
`;

export default function MatchRegisterPage(props) {
  const [matchList, setMatchList] = useState(props.matches);
  const [matchname, setMatchname] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const router = useRouter();
  const sportId = props.sport.id;
  console.log('sportIdcreate', sportId);
  async function createMatch() {
    const matchResponse = await fetch(`/api/sports/${props.sport.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        matchname: matchname,
        date: date,
        time: time,
        location: location,
        sportId: sportId,
      }),
    });
    const match = await matchResponse.json();

    const newState = [...matchList, match];
    setMatchList(newState);

    console.log('newstate create match', newState);
    setMatchname('');
    setDate('');
    setTime('');
    setLocation('');
    // router.reload();
  }

  async function deleteMatch(id) {
    const matchResponse = await fetch(
      `/api/sports/${props.sport.id}/matches/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const deletedMatch = await matchResponse.json();
    const newState = matchList.filter((match) => match.id !== deletedMatch.id);
    setMatchList(newState);
  }

  return (
    <main css={frontPage}>
      <Layout>
        <div css={registercss}>
          <h2>Register Sport Event</h2>

          <form
            css={formStyles}
            onSubmit={async (event) => {
              await event.preventDefault();
            }}
          >
            <label css={labelcss}>
              Date
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.currentTarget.value)}
              />
            </label>
            <label css={labelcss}>
              Match
              <input
                value={matchname}
                onChange={(event) => setMatchname(event.currentTarget.value)}
              />
            </label>

            <label css={labelcss}>
              Time
              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.currentTarget.value)}
              />
            </label>
            <label css={labelcss}>
              Location
              <input
                value={location}
                onChange={(event) => setLocation(event.currentTarget.value)}
              />
            </label>
            <button css={buttoncss} onClick={() => createMatch()}>
              Save
            </button>
          </form>
        </div>
        <h2>{props.sport.name} Matches Schedule</h2>
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
                    <td>
                      {' '}
                      <button
                        onClick={() => {
                          deleteMatch(match.id);
                        }}
                      >
                        remove
                      </button>
                    </td>
                  </tr>
                </table>
                <p></p>
              </div>
            );
          })}
        </div>
      </Layout>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { getMatchesBySportId } = await import('../../../util/database');
  const { getSport } = await import('../../../util/database');

  const sport = await getSport(context.query.sportId);
  console.log('checking sport id', sport);
  const matches = await getMatchesBySportId(context.query.sportId);
  console.log('matches sport', matches);
  return {
    props: {
      sport,
      matches,
    },
  };
}
