let operationModel = require('../models/index')['operation']
let sequelize = require('../models/index')['sequelize']
const returnResponse = require('../services/responseService')

exports.getAllOperations = async (req, res) => {
  try {
    let operations = await operationModel.findAll({
      order: [['id', 'DESC']],
    })
    returnResponse('success', res, operations)
  } catch (error) {
    returnResponse('error', res)
  }
}

exports.getOperationGroup = async (req, res) => {
  try {
    let limit = req.query.q
    let operationGroup = await operationModel.findAll({
      limit: limit,
      order: [['id', 'DESC']],
    })
    returnResponse('success', res, operationGroup)
  } catch (error) {
    returnResponse('error', res)
  }
}

exports.getBalance = async (req, res) => {
  async function getBalanceByType(type) {
    try {
      let amounts = await operationModel.findAll({
        attributes: ['amount'],
        where: { type: type },
      })
      return amounts.reduce((accum, current) => accum + current.amount, 0)
    } catch (error) {
      return null
    }
  }

  let incomeBalance = await getBalanceByType('Income')
  let outcomeBalance = await getBalanceByType('Outcome')
  if (incomeBalance && outcomeBalance) {
    let totalBalance = incomeBalance - outcomeBalance
    let balance = {
      income: incomeBalance,
      outcome: outcomeBalance,
      total: totalBalance,
    }
    returnResponse('success', res, balance)
  } else {
    returnResponse('error', res, 'Unable to calculate balance')
  }
}

exports.createOperation = async (req, res) => {
  try {
    let { concept, amount, date, type } = req.body

    let operation = await operationModel.create({
      concept: concept,
      amount: amount,
      date: date,
      type: type,
    })

    returnResponse('success', res, operation)
  } catch (error) {
    returnResponse('error', res)
  }
}

exports.deleteOperation = async (req, res) => {
  try {
    const deleted = await operationModel.destroy({
      where: {
        id: req.params.id,
      },
    })
    returnResponse('success', res, deleted)
  } catch (error) {
    returnResponse('error', res)
  }
}

exports.editOperation = async (req, res) => {
  try {
    let { concept, amount, date } = req.body
    let { id } = req.params
    let putResponse = await operationModel.update(
      { concept: concept, amount: amount, date: date },
      {
        where: {
          id: id,
        },
      },
    )

    returnResponse('success', res, putResponse)
  } catch (error) {
    returnResponse('error', res)
  }
}
