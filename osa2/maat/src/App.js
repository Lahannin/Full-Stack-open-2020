import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Countries from './Components/Countries'
import axios from 'axios'


const App = () => {
  const [ countries, setCountries] = useState([
  ])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'maat')


  const countriesToShow = countries.filter(
    country => {
      return country.name.toLowerCase().includes(filter.toLowerCase())
    })

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter 
          value={filter}
          onChange={handleFilterChange} />
        <Countries 
          countries={countriesToShow} 
          handler={handleCountryChange} />
    </div>
  )

}

export default App