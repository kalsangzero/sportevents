import { css } from '@emotion/react';
import { useState } from 'react';
import Layout from '../Component/Layout';

const frontPage = css`
  justify-content: center;
  text-align: center;
  background-image: url('/no.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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

export default function MatchRegisterPage() {
  const [match, setMatch] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const handleDateChange = (matchdate) => {
    setDate(matchdate);
  };

  const handleTimeChange = (matchtime) => {
    setTime(matchtime);
  };
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
                value={match}
                onChange={(event) => setMatch(event.currentTarget.value)}
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
            <button css={buttoncss}>Register</button>
          </form>
        </div>
      </Layout>
    </main>
  );
}
