const { operation } = require('../models/index')

async function populateOperations() {
  try {
    const response = await operation.bulkCreate([
      {
        concept: 'Food',
        amount: 200,
        date: new Date(),
        type: 'Outcome',
      },
      {
        concept: 'Friends',
        amount: 100,
        date: new Date(),
        type: 'Outcome',
      },
      {
        concept: 'Job',
        amount: 3500,
        date: new Date(),
        type: 'Income',
      },
      {
        concept: 'Food',
        amount: 50,
        date: new Date(),
        type: 'Outcome',
      },
      {
        concept: 'Shop',
        amount: 230,
        date: new Date(),
        type: 'Outcome',
      },
      {
        concept: 'Sell',
        amount: 850,
        date: new Date(),
        type: 'Income',

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
