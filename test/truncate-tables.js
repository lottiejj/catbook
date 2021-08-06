// export a function that uses sequelize to truncate tables
require('dotenv').config()
const { Cat } = require('../models')

const truncateTables = async () => {
  await Cat.destroy({truncate: true, cascade: true})
}

module.exports = truncateTables
