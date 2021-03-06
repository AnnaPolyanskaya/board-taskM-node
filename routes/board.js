const express = require('express')
const passport = require('passport')
const controller = require('../controllers/board')

const router = express.Router()

router.post('/create', passport.authenticate('jwt', {sesssion: false}), controller.create)
router.delete('/delete', passport.authenticate('jwt', {sesssion: false}), controller.delete)
router.patch('/update', passport.authenticate('jwt', {sesssion: false}), controller.update)

module.exports = router