
const env = 'development';

const knexfile = require('./knexfile');
const knex = require('knex');

//Aqui pido que se conecte a la base de datos 
module.exports = knex(knexfile[env])