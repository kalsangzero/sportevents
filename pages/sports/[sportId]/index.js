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
  const [matchList, setMatchList] = useState(props.bookmarks);
  const [matchname, setMatchname] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const sportId = props.sport.id;
  const [setErrors] = useState([]);
  const router = useRouter();
  const handleDateChange = (matchdate) => {
    setDate(matchdate);
  };

  const handleTimeChange = (matchtime) => {
    setTime(matchtime);
  };

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
    if ('errors' in match) {
      setErrors(match.errors);
      return;
    }
    const newState = [...matchList, match];
    setMatchList(newState);
    setMatchname('');
    setDate('');
    setTime('');
    setLocation('');
    router.reload();
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
          <h1>Register Sport Event</h1>

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
                onChange={(event) =>
                  handleDateChange(event.currentTarget.value)
                }
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
                onChange={(event) =>
                  handleTimeChange(event.currentTarget.value)
                }
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
        <div>
          {matchList.map((match) => {
            return (
              <div key={`match-li-${match.id}`}>
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
                    <td>{match.date}</td>
                    <td>{match.time}</td>
                    <td>{match.matchname}</td>
                    <td>{match.location}</td>
                  </tr>
                </table>
                <p>
                  <button
                    onClick={() => {
                      deleteMatch(match.id);
                    }}
                  >
                    remove
                  </button>
                </p>
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

  const matches = await getMatchesBySportId(context.query.sportId);

  return {
    props: {
      matches,
      sport,
    },
  };
}
