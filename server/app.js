const express = require('express')
const cors = require('cors')

const sharks = require('./sharks')
const logger = require('./logger.js')

const app = express()

// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
    res.status(200).send(sharks)
  })

app.get('/sharks', (req, res) => {
  res.send(sharks)
})

app.get('/sharks/:id', (req, res) => {
    app.get('/sharks/:id', (req, res) => {
        const idx = req.params.id
      
        const shark = sharks[idx - 1]
        
        if (!shark) {
          res.status(404).json({ message: `Sharks with id ${idx} not found` })
        } else {
          res.status(200).send(shark)
        }
      })
  })

module.exports = app