const { operation } = require('../models/index')

async function populateOperations() {
  try {
    const response = await operation.bulkCreate([
      {
        id: 1,
        concept: '',
        amount: 123,
        date: new Date(),
        type: 'Income',
      },
      {
        id: 2,
        concept: '',
        amount: 1123,
        date: new Date(),
        type: 'Income',
      },
      {
        id: 3,
        concept: '',
        amount: 2123,
        date: new Date(),
        type: 'Income',
      },
      {
        id: 4,
        concept: '',
        amount: 1223,
        date: new Date(),
        type: 'Outcome',
      },
      {
        id: 5,
        concept: '',
        amount: 1523,
        date: new Date(),
        type: 'Income',
      },
      {
        id: 6,
        concept: '',
        amount: 1923,
        date: new Date(),
        type: 'Outcome',
      },
    ])
    if (response.length == 6) {
      return new Promise((resolve, reject) => {
        resolve(true)
      })
    }
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject(new Error(e))
    })
  }
}

module.exports = populateOperations
