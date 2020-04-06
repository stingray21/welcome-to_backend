const saveState = require('./saveState');

module.exports = (req, res) => {
	let gameId = req.params.gameId;

	req.db
		.one('SELECT state FROM games WHERE game_id = $<id>', { id: gameId })
		.then(async (data) => {
			// console.log(data);
			let state = data.state;

			let clients = req.query.clients;

			state.additiveNext = 0;
			state.additiveNextLimit = 1 * clients;

			let saved = await saveState(req.db, gameId, state);
			console.log('Updated plans saved:', saved);

			res.json({ steps: state.additiveNext, limit: state.additiveNextLimit });
		})
		.catch((error) => {
			console.log(error.message || error);
			res.json('error for ' + gameId);
		});
};
