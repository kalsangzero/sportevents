exports.up = async function up(sql) {
  await sql`
	CREATE TABLE match (
		id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
 		match varchar(120) UNIQUE,
    time varchar(60),
		date varchar(120),
		location varchar(240),
		_sport_id integer REFERENCES sports (id) ON DELETE CASCADE
	);`;
};

exports.down = async function down(sql) {
  await sql`DROP TABLE match`;
};
