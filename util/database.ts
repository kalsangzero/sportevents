import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

dotenvSafe.config();

export type User = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
};

export type Sport = {
  id: number;
  name: string;
  sportId: number;
};

export type Match = {
  id: number;
  matchname: string;
  time: string;
  location: string;
  sportId: number;
  date: string;
};

export type UserWithPasswordHash = User & {
  password_hash: string;
};

export type Session = {
  id: number;
  token: string;
  userId: number;
  expiryTimestamp: Date;
};

// connect toPostgresSQL
const sql = postgres();
sql`SELECT 1;`.then((result) => console.log(result));

export async function getUsers() {
  const users = await sql<User[]>`
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

export async function getUser(id: number) {
  const [user] = await sql<[User]>`
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

export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
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
}: {
  username: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
}) {
  const [user] = await sql<[User | undefined]>`
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
export async function deleteUserById(id: number) {
  const [user] = await sql<[User | undefined]>`
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

export async function updateUserById(
  id: number,
  {
    username,
    firstName,
    lastName,
  }: {
    username: string;
    firstName: string;
    lastName: string;
  },
) {
  const [user] = await sql<[User | undefined]>`
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

export async function getValidSessionByToken(token: string) {
  if (!token) return undefined;

  const [session] = await sql<[Session | undefined]>`
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

export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
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
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < NOW()
    RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session));
}

export async function deleteSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session))[0];
}

export async function insertSport({ name }: { name: string }) {
  const [sport] = await sql<[Sport | undefined]>`
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
  const sports = await sql<Sport[]>`
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

export async function getSport(id: number) {
  const [sport] = await sql<[Sport]>`
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

export async function deleteSportById(id: number) {
  const [sport] = await sql<[Sport | undefined]>`
    DELETE FROM
      sports
    WHERE
      id = ${id}
    RETURNING
    id,
      name,
      user_id
  `;
  return sport && camelcaseKeys(sport);
}

// export async function updateSportById({ id, name, user_id }) {
//   const sport = await sql`
//     UPDATE
//       sports
//     SET
//      name = ${name}
//     WHERE
//       id = ${id}
//     RETURNING
//       id,
//       name

//   `;
//   return sport && camelcaseKeys(sport);
// }

export async function insertMatch({
  matchname,
  date,
  time,
  location,
  sportId,
}: {
  matchname: string;
  date: string;
  time: string;
  location: string;
  sportId: number;
}) {
  const [match] = await sql<[Match | undefined]>`
    INSERT INTO matches
      (matchname, date, time, location, sport_id)
    VALUES
     (${matchname}, ${date}, ${time}, ${location}, ${sportId})
    RETURNING
    matchname,
    date,
    time,
    location,
    sport_id
  `;
  return match && camelcaseKeys(match);
}

export async function getMatches() {
  const matches = await sql<Match[]>`
      SELECT
         id,
         matchname,
         date,
         time,
         location,
         sport_id
      FROM
         matches
         `;

  return matches.map((match) => {
    return camelcaseKeys(match);
  });
}

export async function getMatch(id: number) {
  const [match] = await sql<[Match]>`
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

export async function deleteMatchById(id: number) {
  const [match] = await sql<[Match | undefined]>`
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
      sport_id
  `;
  return match && camelcaseKeys(match);
}

export async function updateMatchById(
  id: number,
  {
    matchname,
    time,
    location,
    date,
  }: {
    matchname: string;
    time: string;
    location: string;
    date: string;
  },
) {
  const [match] = await sql<[Match | undefined]>`
    UPDATE
      matches
    SET
      matchname = ${matchname},
      time =${time},
      location = ${location},
      date= ${date}
    WHERE
      id = ${id}
    RETURNING
      id,
      matchname,
      time
  `;
  return match && camelcaseKeys(match);
}

export async function getMatchesBySportId(id: number) {
  const matches = await sql`
     SELECT
   matches.id,
   matches.date,
   matches.matchname,
   matches.time,
   matches.location,
   sports.id as sport_id
  FROM
   sports,
   matches
  WHERE
   matches.sport_id = sports.id
  AND
    sports.id = ${id}
;
`;

  return matches.map((match) => {
    return camelcaseKeys(match);
  });
}
