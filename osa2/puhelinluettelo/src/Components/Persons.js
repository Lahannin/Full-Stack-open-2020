import React from 'react'
  

const Persons = ({person, deletePerson}) => {
   return (  
      <div>
       {person.map((person) =>
       <Person key={person} person={person} deletePerson={deletePerson}/>
       )}
     </div>
   )
}

const Person = ({person, deletePerson}) => {
  const alertBox = (person, deletePerson) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(person.id)
    }

  }

   return ( 
      <p>
        {person.name} {person.number} <button onClick={() => alertBox(person, deletePerson)}>Delete</button>
      </p>
    )

}


export default Persons