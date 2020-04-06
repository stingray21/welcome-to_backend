module.exports = async (req, res) => {
	let gameId = req.params.gameId;

	req.db
		.one(
			"SELECT state -> 'currentSet' AS currentSet, state -> 'additiveNextLimit' AS nextlimit FROM games WHERE game_id = $<id>",
			{ id: gameId }
		)
		.then(async (data) => {
			// console.log(data);
			let state = data.currentset;

			state.additiveNextLimit = data.nextlimit;
			res.json(state);
		})
		.catch((error) => {
			console.log(error.message || error);
			res.json('error for ' + gameId);
		});
};
