// panggil semua file handler chapters kedalam index.js

const create = require("./create");
const update = require("./update");
const get = require("./get");
const getAll = require("./getAll");
const destroy = require("./destroy");

// export module
module.exports = {
  create, update, get, getAll, destroy
}