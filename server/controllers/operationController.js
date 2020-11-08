let operationModel = require('../models/index')['operation']
let sequelize = require('../models/index')['sequelize']

exports.getAllOperations = async (req, res) => {
  try {
    let operations = await operationModel.findAll({
      order: [['id', 'DESC']],
    })
    return res.json({ operations: operations })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

exports.getOperationGroup = async (req, res) => {
  try {
    let limit = req.query.q
    let operationGroup = await operationModel.findAll({
      limit: limit,
      order: [['id', 'DESC']],
    })
    res.json({ operationGroup: operationGroup })
  } catch (error) {
    return res.status(500).send(error.message)
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
    res.json({
      balance: {
        income: incomeBalance,
        outcome: outcomeBalance,
        total: totalBalance,
      },
    })
  } else {
    return res.status(500)
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

    res.json({ created: JSON.stringify(operation) })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

exports.deleteOperation = async (req, res) => {
  try {
    const deleted = await operationModel.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.json({ status: deleted })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

exports.editOperation = async (req, res) => {
  try {
    let { concept, amount, date, id } = req.body

    let putResponse = await operationModel.update(
      { concept: concept, amount: amount, date: date },
      {
        where: {
          id: id,
        },
      },
    )

    res.json({ opedited: putResponse })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
