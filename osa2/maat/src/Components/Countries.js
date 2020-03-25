import React from 'react'
import Weather from './Weather'
  
const Countries = ({countries, handler}) => {
    if (countries.length > 10) {
        return (
            <div>
                <h2>Found {countries.length} countries</h2>
                <p> Please specify more</p>
            </div>
        )
    } else if (countries.length > 1) {
        return (
            <div>
                <h2>Found {countries.length} countries:</h2>
                {countries.map((country) =>
                <Country country={country} handler={handler} />
                )}
            </div>
        )
        }  else if (countries.length === 1) {
            return (
                <div>
                    {countries.map((country) =>
                    <CountryDetails country={country} />
                    )}
                </div>
            )
        } else {
            return (
                <p>No countries</p>
            )
            }
    }

const Country = ({country, handler}) => {
   return (
      <p>
        {country.name} <button onClick={handler} value={country.name} >show</button>
      </p>
    )
}

const CountryDetails = ({country}) => {
    return (
       <div>
           <h2>Found 1 country:</h2>
           <h3>{country.name}</h3>
           <p>Capital: 
               {country.capital}</p>
           <p>Population: 
               {country.population}</p>
           <h4>Languages</h4>
           <ul>
            {   country.languages.map((language)=> 
            <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt="flag" height="80px"/>
           <Weather city={country.capital} />
       </div>
     )
 }

export default Countries