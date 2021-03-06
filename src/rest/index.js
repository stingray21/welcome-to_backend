const health = require('./health');

const result = require('dotenv').config();
//console.log('ENV: ', process.env);
if (result.error) {
	throw result.error;
}
// console.log("Parsed .env: ",result.parsed);

const pgp = require('pg-promise')({
	/* initialization options */
	capSQL: true // capitalize all generated SQL
});

const startGame = require('./startGame');
const getGames = require('./getGames');
const getState = require('./getState');
const setState = require('./setState');
const setSettings = require('./setSettings');
const getHistory = require('./getHistory');
const setPlans = require('./setPlans');
const initialize = require('./initState');
const resetState = require('./resetState');
const login = require('./login');

const db = require('./db')();

// loadCardsInDB();
// loadPlansInDB();

// Initialize app
initialize(db);

module.exports = (app) => {
	app.use((req, res, next) => {
		req.db = db;
		next();
	});

	app.get('/welcome-api/_health', health);
	app.get('/welcome-api/activegames', (req, res) => getGames(req, res));
	app.get('/welcome-api/:gameId/game', (req, res) => startGame(req, res));
	app.get('/welcome-api/:gameId/next', (req, res) => setState(req, res));
	app.get('/welcome-api/:gameId/state', (req, res) => getState(req, res));
	app.get('/welcome-api/:gameId/history', (req, res) => getHistory(req, res));
	app.get('/welcome-api/:gameId/plans', (req, res) => setPlans(req, res));
	app.get('/welcome-api/:gameId/settings', (req, res) => setSettings(req, res));
	app.get('/welcome-api/:gameId/reset', (req, res) => resetState(req, res));
	app.get('/welcome-api/:user/login', (req, res) => login(req, res));
};

function loadCardsInDB() {
	// Load cards into DB
	let cards = require('./cards.json');
	// console.log(cards);

	const card_cs = new pgp.helpers.ColumnSet([ 'card' ], { table: 'cards' });
	const card_query = pgp.helpers.insert(cards, card_cs);
	db
		.none(card_query)
		.then((data) => {
			// success, data = null
			console.log('Cards in DB');
		})
		.catch((error) => {
			console.log(error);
			// error;
		});
}

function loadPlansInDB() {
	// Load plans into DB
	let plans = require('./plans.json');
	// console.log(plans);

	const plan_cs = new pgp.helpers.ColumnSet([ 'plan' ], { table: 'plans' });
	const plan_query = pgp.helpers.insert(plans, plan_cs);
	db
		.none(plan_query)
		.then((data) => {
			// success, data = null
			console.log('Plans in DB');
		})
		.catch((error) => {
			console.log(error);
			// error;
		});
}
