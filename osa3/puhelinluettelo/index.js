require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')
const cors = require('cors')


morgan.token('body',(request) => {
  if(request.method === 'POST') {
    return JSON.stringify(request.body)
  } else {
    return ''
  }
})

app.use(morgan(':method :url :status :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons.map(person => person.toJSON()))
    })
    .catch(error => next(error))
})

app.get('/api/info', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.status(200)
        .send(`Phonebook has info for ${persons.length} people.<br />${new Date().toString()}`)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name.length < 3 && body.number.length < 8) {
    return response.status(400).json({
      error: 'Name and number are too short'
    })
  } else if (body.name.length < 3) {
    return response.status(400).json({
      error: 'Name is too short'
    })
  }  else if (body.number.length < 8) {
    return response.status(400).json({
      error: 'Number is too short'
    })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON())
    }).catch((error) => {
      if(error.name === 'ValidationError'){
        response.status(400).send(error.message)
      }
      else{
        next(error)
      }})
})


app.put('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, { number: request.body.number }, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})