var crypto = require('crypto');

module.exports = async (req, res) => {
	// let games = {};
	// await req.db
	// 	.any('SELECT game_id, name, timestamp FROM games')
	// 	.then(async (data) => {
	// 		// console.log(data);
	// 		games = data;
	// 	})
	// 	.catch((error) => {
	// 		console.log(error.message || error);
	// 	});

	var password = 'baseball';

	var user = req.params.user;
	var pw_hash = req.query.h;

	var hash = crypto.createHash('sha256').update(password).digest('hex');

	console.log('Crypto', user, pw_hash, hash);

	let approve = false;

	if (pw_hash === hash) {
		approve = true;
	}

	var result = { u: user, a: approve, h: pw_hash };
	console.log(result);

	res.json(result);
};
