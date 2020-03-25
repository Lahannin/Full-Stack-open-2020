const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const nimi = process.argv[3] || null
const phone = process.argv[4] || null

const url =
  `mongodb+srv://fullstack:${password}@cluster0-rhtae.mongodb.net/puhelinluettelo?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)

const person = new Person({
  name: nimi,
  number: phone,
})

if (!nimi || !phone) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
      mongoose.connection.close()
    })

  })
} else {
  person.save().then(response => {
    console.log('added ', nimi, ' number ', phone, ' to phonebook')
    mongoose.connection.close()
  })
}
