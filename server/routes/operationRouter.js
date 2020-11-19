const express = require('express')
const router = express.Router()
const operation = require('../controllers/operationController')

router.get('/', operation.getAllOperations)
router.get('/group', operation.getOperationGroup)
router.get('/balance', operation.getBalance)
router.post('/', operation.createOperation)
router.delete('/:id', operation.deleteOperation)
router.put('/:id', operation.editOperation)

module.exports = router
