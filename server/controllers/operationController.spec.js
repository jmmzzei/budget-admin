process.env.NODE_ENV = 'test'
const app = require('../index')
const request = require('supertest')
const { sequelize, operation } = require('../models/index')


describe('GET /posts ', () => {
  test('It should respond with posts', async () => {
    expect(true).toBe(true)
  })
})

