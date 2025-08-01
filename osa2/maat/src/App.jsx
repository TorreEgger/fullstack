import { useState, useEffect } from 'react'
import axios from 'axios'
const App = () => {

  const [value, setValue] = useState('')
  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState({})

  if(!countries)
    return null


  useEffect(() => {
    if (country) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
        .then(response => {
          setCountries(response.data)
          console.log(response.data)
        })
    }
  }, [country])


  console.log(countries)
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(value)


    console.log(countries.filter(country => country.common.toLowerCase().includes(value.toLowerCase())))

  }


  console.log(countries.name)

  return(
    <div>
      <form onSubmit={onSearch}>
        find countries <input value={value} onChange={handleChange} />
      </form>
    </div>
  )
}

export default App
