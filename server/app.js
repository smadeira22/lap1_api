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
  res.status(200).send('Are you Ready!')
})

app.get('/sharks', (req, res) => {
  res.send(sharks)
})

app.get('/sharks/:id', (req, res) => {
  const idx = req.params.id

  const shark = sharks[idx - 1]
  
  if (!shark) {
    res.status(404).json({ message: `Sharks with id ${idx} not found` })
  } else {
    res.status(200).send(shark)
  }
})

app.post('/sharks', (req, res) => {
  // pseudocode
  // I want to retrieve information from hoppscotch
  console.log("line 36", req.body)
  // From info
  // I want to create a fruit
  const shark = req.body
  // I want to add the fruit to my fruits array
  if (!shark) {
    res.status(422).json({ message: `Sharks with id ${idx} not found` })
  }else{
    sharks.push(shark)
    res.status(201).send(shark) }
})


module.exports = app