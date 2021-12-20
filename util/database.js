import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

dotenvSafe.config();

// connect toPostgresSQL
const sql = postgres();
sql`SELECT 1;`.then((result) => console.log(result));

export async function getUsers() {
  const users = await sql`
      SELECT
         id,
         username
      FROM
         users;
         `;
  // console.log('proooo', products);
  return users.map((user) => {
    return camelcaseKeys(user);
  });
}

export async function getUser(id) {
  const user = await sql`
      SELECT
      id,
      username
      FROM
      users
      Where
      id =${id}
      `;
  return camelcaseKeys(user);
}

export async function getUserWithPasswordHashByUsername(username) {
  const user = await sql`
      SELECT
      id,
      username,
      password_hash
      FROM
      users
      Where
      username =${username}
      `;
  return user && camelcaseKeys(user);
}
export async function insertUser({
  username,
  passwordHash,
  firstName,
  lastName,
}) {
  const user = await sql`
    INSERT INTO users
      (username, password_hash, first_name, last_name)
    VALUES
      (${username}, ${passwordHash}, ${firstName}, ${lastName})
    RETURNING
      id,
      username,
      first_name,
      last_name
  `;
  return user && camelcaseKeys(user);
}
export async function deleteUserById(id) {
  const [user] = await sql`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING
    id,
      username,
      first_name,
      last_name
  `;
  return user && camelcaseKeys(user);
}

export async function updateUserById(id, username, firstName, lastName) {
  const user = await sql`
    UPDATE
      users
    SET
      username = ${username},
      first_name = ${firstName},
      last_name = ${lastName}
    WHERE
      id = ${id}
    RETURNING
      id,
      username,
      first_name,
      last_name
  `;
  return user && camelcaseKeys(user);
}

export async function getValidSessionByToken(token) {
  if (!token) return undefined;

  const [session] = await sql`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry_timestamp > NOW()
  `;

  return session && camelcaseKeys(session);
}

export async function createSession(token, userId) {
  const session = await sql`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      *
  `;

  return camelcaseKeys(session);
}

export async function deleteExpiredSessions() {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < NOW()
    RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session));
}

export async function deleteSessionByToken(token) {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session))[0];
}

export async function insertSport({ name }) {
  const sport = await sql`
    INSERT INTO sports
      (name)
    VALUES
      (${name})
    RETURNING
      id,
      name

  `;
  return sport && camelcaseKeys(sport);
}

export async function getSports() {
  const sports = await sql`
      SELECT
         id,
         name
      FROM
         sports;
         `;

  return sports.map((sport) => {
    return camelcaseKeys(sport);
  });
}

export async function getSport(id) {
  const sport = await sql`
      SELECT
      id,
      name
      FROM
      sports
      Where
      id =${id}
      `;
  return camelcaseKeys(sport);
}

export async function deleteSportById(id) {
  const sport = await sql`
    DELETE FROM
      sports
    WHERE
      id = ${id}
    RETURNING
    id,
      name,
      _user_id
  `;
  return sport && camelcaseKeys(sport);
}

export async function updateSportById(id, name, _user_id) {
  const sport = await sql`
    UPDATE
      sports
    SET
     name = ${name}
    WHERE
      id = ${id}
    RETURNING
      id,
      name

  `;
  return sport && camelcaseKeys(sport);
}

export async function insertMatch({
  matchname,
  date,
  time,
  location,
  sportId,
}) {
  const match = await sql`
    INSERT INTO matches
      (matchname, date, time,location, _sport_id)
    VALUES
     (${matchname}, ${date}, ${time}, ${sportId}, ${location})
    RETURNING
    matchname,
    date,
    time,
    location,
    _sport_id
  `;
  return match && camelcaseKeys(match);
}

export async function getMatches() {
  const matches = await sql`
      SELECT
         id,
         matchname,
         date,
         time,
         location,
         _sport_id
      FROM
         matches
         `;

  return matches.map((match) => {
    return camelcaseKeys(match);
  });
}

export async function getMatch(id) {
  const match = await sql`
      SELECT
      id,
      matchname,
      date,
      time,
      location
      FROM
      matches
      Where
      id =${id}
      `;
  return camelcaseKeys(match);
}

export async function deleteMatchById(id) {
  const match = await sql`
    DELETE FROM
      matches
    WHERE
      id = ${id}
    RETURNING
    id,
      matchname,
      time,
      date,
      location
      _sport_id
  `;
  return match && camelcaseKeys(match);
}

export async function updateMatchById(id, matchname, time) {
  const match = await sql`
    UPDATE
      matches
    SET
      matchname = ${matchname},
      time =${time}
    WHERE
      id = ${id}
    RETURNING
      id,
      matchname,
      time
  `;
  return match && camelcaseKeys(match);
}

export async function getMatchesBySporId(id) {
  const matches = await sql`
     SELECT
   matches.id,
   matches.date,
   matches.matchname,
   matches.time,
   matches.location,
   sports.id as _sport_id
  FROM
   sports,
   matches
  WHERE
   matches._sport_id = sports.id
  AND
    sports.id = ${id}
;
`;
  // console.log('proooo', products);
  return matches.map((match) => {
    return camelcaseKeys(match);
  });
}
