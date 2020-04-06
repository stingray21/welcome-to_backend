const updateState = require('./updateState');
const saveState = require('./saveState');

module.exports = async (db, gameId, name) => {
	db
		.task('get-resources', async (t) => {
			const plan1 = await t.one(
				"SELECT plan -> 'cat' AS cat, plan -> 'id' AS id, plan -> 'first' AS first, plan -> 'others' AS others FROM plans WHERE plan ->> 'cat' = '1' ORDER BY random() LIMIT 1;"
			);
			const plan2 = await t.one(
				"SELECT plan -> 'cat' AS cat, plan -> 'id' AS id, plan -> 'first' AS first, plan -> 'others' AS others FROM plans WHERE plan ->> 'cat' = '2' ORDER BY random() LIMIT 1;"
			);
			const plan3 = await t.one(
				"SELECT plan -> 'cat' AS cat, plan -> 'id' AS id, plan -> 'first' AS first, plan -> 'others' AS others FROM plans WHERE plan ->> 'cat' = '3' ORDER BY random() LIMIT 1;"
			);

			return [ plan1.id, plan2.id, plan3.id ];
		})
		.then(async (plans) => {
			// console.log(plans);

			const state = {};

			// State of game
			state.seed = Math.floor(Math.random() * 10000 + 1);
			state.index = 0;
			state.shuffledDecks = null;
			state.currentSet = null;
			state.round = 0;
			state.deckLog = [];
			state.history = [];
			state.shuffled = false;
			state.plans = plans;
			state.plansApproved = [ false, false, false ];
			state.additiveNext = 0;
			state.additiveNextLimit = 0;

			// let gameId = Math.random().toString(36).substr(2, 9);
			if (gameId === undefined) gameId = 'default';
			let saved = await saveState(db, gameId, state, name);
			console.log('Init saved:', saved);
			return updateState(db, gameId);
		})
		.catch((error) => {
			console.log(error);
			return false;
		});
};
