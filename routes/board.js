const express = require('express')
const controller = require('../controllers/board')

const router = express.Router()

router.post('/create', controller.create)
router.delete('/delete', controller.delete)
router.patch('/update', controller.update)

module.exports = router