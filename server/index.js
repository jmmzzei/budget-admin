require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const { sequelize, operation } = require('./models/index')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const operationRouter = require('./routes/operationRouter')

const app = express()

app.set('port', 4000)
app.use(helmet())
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api', operationRouter)

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  app.get('*', (req, res) => {
    res.sendFile('build/index.html', { root: __dirname })
  })
}

if (process.env.NODE_ENV !== 'test') {
  sequelize
    .sync()
    .then(() => {
      console.log('Connection has been established successfully.')
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err)
    })
}

module.exports = app
