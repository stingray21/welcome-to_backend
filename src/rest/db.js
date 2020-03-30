const pgp = require('pg-promise')(/* initialization options */);

// console.log('DB USER: ', process.env.DB_USER);
// console.log('DB PASSWORD: ', process.env.DB_PASSWORD);

module.exports = (param) => {
	const cn = {
		host: 'localhost', // server name or IP address;
		port: 5432,
		database: 'welcometo',
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD
	};

	// alternative:
	// var cn = 'postgres://username:password@host:port/database';

	const db = pgp(cn); // database instance;

	// TEST CONNECTION
	// db
	// 	.connect()
	// 	.then(function (obj) {
	// 		obj.done(); // success, release connection;
	// 	})
	// 	.catch(function (error) {
	// 		console.log('ERROR:', error.message);
	// 	});

	return db;
};
