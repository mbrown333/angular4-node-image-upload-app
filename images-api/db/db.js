const config = require('../knexfile.js');
const knex = require('knex')(config['development']);

module.exports = knex;

knex.migrate.latest(['development']);