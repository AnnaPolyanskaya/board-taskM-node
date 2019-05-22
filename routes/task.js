const express = require('express')
const passport = require('passport')
const controller = require('../controllers/task')

const router = express.Router()

router.post('/create', passport.authenticate('jwt', {sesssion: false}), controller.create)
router.delete('/delete', passport.authenticate('jwt', {sesssion: false}), controller.delete)
router.patch('/update', passport.authenticate('jwt', {sesssion: false}), controller.update)
router.patch('/status', passport.authenticate('jwt', {sesssion: false}), controller.status)

module.exports = router