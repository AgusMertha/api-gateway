const create = require('./create');
const getAll = require('./getAll');
const destroy = require('./destroy');

// definisikan dan export handler di index
module.exports = {
  create, getAll, destroy
}