// export a function that uses sequelize to insert a record
require('dotenv').config()
const { Cat } = require('../models')

const createCat = async () => {
  await Cat.create({
    name: 'test-name',
    breed: 'test-breed',
    owner: 'test-owner'
  })
}

module.exports = createCat
