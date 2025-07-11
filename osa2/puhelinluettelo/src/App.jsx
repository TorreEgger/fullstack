import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  

const addPerson = (event) => {
  event.preventDefault()


  if (persons.find(name => name.name === newName))
    return alert(`${newName} is already added to phonebook`)

  const nameObject = {
    name: newName
  }


  setPersons(persons.concat(nameObject))
  setNewName('')
}


const handleNameChange = (event) => {
  //console.log(event.target.value)
  setNewName(event.target.value)
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(x =>
      <p key={x.name}>
        {x.name}
      </p>
      )}
    </div>
  )

}

export default App