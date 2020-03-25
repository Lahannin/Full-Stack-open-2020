import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Persons from './Components/Persons'
import PersonForm from './Components/PersonForm'
import Notification from './Components/Notification'
import personService from './services/data'


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ style, setStyle] = useState('') 


  useEffect(() => {
    personService
      .getAll()
        .then(initialPerson => {
          setPersons(initialPerson)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newPhone
    }

    const existing = persons.map((person) => person.name)
      if (!existing.includes(personObject.name)) {
        personService
          .create(personObject)
            .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
      })

      setErrorMessage('added ' + newName )
      setStyle('green')

    } else {
      if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {
        const newPerson = persons.find(n => n.name === newName.toLowerCase())
        const id = newPerson.id
        personService
        .update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          })
        
        
     }
    }
    setNewName('')
    setNewPhone('')
}   



  const personsToShow = persons.filter(
    person => {
      return person.name.toLowerCase().includes(filter.toLowerCase())
    })

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleDeletion = id => {
    const deletePerson = persons.find(n => n.id === id)
      personService
       .remove(id)
         .then(data => {
          setPersons(persons.filter(person => person.id !== id))
          setErrorMessage('Successfully removed ' + deletePerson.name)
          setStyle('green')
         })
         .catch(error => {
          setErrorMessage(deletePerson.name + ' has already been deleted')
          setStyle('red')
         })
      
      
         
      
      
        }     

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} style={style} />
      <Filter 
          value={filter}
          onChange={handleFilterChange} />
        <h4>Add new person</h4>
      <PersonForm 
        submitForm={addPerson}
        name={newName}
        onClickName={handlePersonChange}
        phone={newPhone}
        onClickPhone={handlePhoneChange} />
      <h2>Numbers</h2>
        <Persons 
          person={personsToShow} 
          deletePerson={handleDeletion}  
        />
    </div>
  )

}

export default App