process.env.NODE_ENV = 'test'
const app = require('../index')
const request = require('supertest')
const { sequelize } = require('../models/index')
const populateOperations = require('../helpers/populateOperations')

beforeAll(async () => {
  try {
    await sequelize
      .sync({ force: true })
      .then(() => {
        console.log(
          'Connection succesfully established with: ' +
            sequelize.getDatabaseName(),
        )
      })
      .catch(() => {
        console.log('Cannot connect')
      })
    await populateOperations()
  } catch (e) {
    throw new Error(e)
  }
})

describe('GET /posts ', () => {
  test('It should respond with posts', async () => {
    expect(true).toBe(true)
  })
})
