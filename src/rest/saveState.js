module.exports = async (db, gameId, state, name) => {
	if (name === undefined) {
		name = 'Default';
	}

	let result;
	await db
		.query(
			'INSERT INTO games(game_id, state, name, timestamp) VALUES($<id>,$<state>,$<name>,NOW() ) ON CONFLICT(game_id) DO UPDATE SET timestamp = NOW(), state = $<state> ',
			{
				id: gameId,
				state: state,
				name: name
			}
		)
		.then((data) => {
			result = true;
		})
		.catch((error) => {
			console.log(error.message || error);
			result = false;
		});
	// console.log(result);
	return result;
};
