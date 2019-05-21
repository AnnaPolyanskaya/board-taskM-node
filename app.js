const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Cors = require('cors')
const passport = require('passport')
const keys = require('./config/keys')

const authRoute = require('./routes/auth')
const boardRoute = require('./routes/board')

const port = process.ENV || 5000
const app = express()

app.use(Cors())
app.set('Secret', keys.jwt)


// Connecting mongoose
mongoose.connect(keys.mongoUri)
    .then(console.log('MongoDB connected'))
    .catch(error => console.log(error))

//passport
app.use(passport.initialize())
require('./middlewars/passport')(passport)


// BodyParser setup    
app.use(bodyParser.urlencoded({ extended: false }))    
app.use(bodyParser.json())

// Use routes
app.use('/api/auth', authRoute)
app.use('/api/board', boardRoute)

// Start server
app.listen(port, () => console.log(`App listen at port ${port}`))