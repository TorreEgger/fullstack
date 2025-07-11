import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244'
    }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')
  

const addPerson = (event) => {
  event.preventDefault()


  if (persons.find(name => name.name === newName))
    return alert(`${newName} is already added to phonebook`)

  const nameObject = {
    name: newName,
    number: newNumber
  }


  setPersons(persons.concat(nameObject))
  setNewName('')
  setNewNumber('')
}


const handleNameChange = (event) => {
  //console.log(event.target.value)
  setNewName(event.target.value)
}


const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}






  return (      
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(x =>
      <p key={x.name}>
        {x.name} {x.number}
      </p>
      )}
    </div>
  )

}

export default App