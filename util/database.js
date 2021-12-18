import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

dotenvSafe.config();

// connect toPostgresSQL
const sql = postgres();
sql`SELECT 1;`.then((result) => console.log(result));

export async function getSports() {
  const sports = await sql`
      SELECT * FROM sports`;

  return sports.map((sport) => {
    return camelcaseKeys(sport);
  });
}
export async function insertUser({ username, passwordHash }) {
  const [user] = await sql`
    INSERT INTO users
      (username, password_hash)
    VALUES
      (${username}, ${passwordHash})
    RETURNING
      id,
      username

  `;
  return user && camelcaseKeys(user);
}
