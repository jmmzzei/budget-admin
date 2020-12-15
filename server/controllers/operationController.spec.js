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

describe('GET / ', () => {
  test('It should respond with operations', async () => {
    const response = await request(app).get('/api/')
    expect(response.statusCode).toBe(200)
    expect(response.body.data.length).toBeGreaterThanOrEqual(1)
    expect(response.body.status).toBe('success')
    expect(response.body.data[0].id > response.body.data[1].id).toBe(true)
  })
})

describe('GET /group ', () => {
  test('It should respond with a group of variable length', async () => {
    const response = await request(app).get('/api/group?q=2')
    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('success')
    expect(response.body.data[0].id > response.body.data[1].id).toBe(true)
  })
})
describe('GET /balance ', () => {
  test('It should respond with the balance', async () => {
    const response = await request(app).get('/api/balance')
    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('success')
    expect(typeof response.body.data.income).toBe('number')
    expect(typeof response.body.data.outcome).toBe('number')
    expect(typeof response.body.data.total).toBe('number')
  })
})

describe('POST / ', () => {
  test('It should respond with the created operation', async () => {
    const response = await request(app).post('/api/').send({
      type: 'Income',
      amount: 200,
      concept: 'Shop',
      date: new Date(),
    })
    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('success')
    expect(response.body.data.type).toBe('Income')
    expect(response.body.data.amount).toBe(200)
  })
})
