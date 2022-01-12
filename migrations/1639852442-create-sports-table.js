exports.up = async function up(sql) {
  await sql`
	CREATE TABLE sports (
		id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
 		name varchar(30) UNIQUE NOT NULL,
    user_id integer REFERENCES users (id) ON DELETE CASCADE
	);`;
};

exports.down = async function down(sql) {
  await sql`DROP TABLE sports`;
};
