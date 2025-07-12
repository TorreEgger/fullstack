import { useState } from 'react'


const Filter = (props) => {

 return (
  <div>
    filter shown with <input
    value={props.searched}
    onChange={props.handleSearchChange}
    />
  </div>
 )
}


const PersonForm = (props) => {
 
 
  return (
      <form onSubmit={props.addPerson}>
        <div>
          name: <input 
          value={props.newName}
          onChange={props.handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={props.newNumber}
          onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}


const Persons = (props) => {
  return (
    <div>
       {props.show.map(x =>
      <p key={x.name}>
        {x.name} {x.number}
      </p>
      )}
    </div>

  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [searched, setSearched] = useState('')

  const [show, setShow] = useState(persons)



  

const addPerson = (event) => {
  event.preventDefault()


  if (persons.find(person => person.name === newName))
    return alert(`${newName} is already added to phonebook`)

  const nameObject = {
    name: newName,
    number: newNumber
  }


  setPersons(persons.concat(nameObject))
  setShow(persons.concat(nameObject))
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


const handleSearchChange = (event) => {
 // console.log(event.target.value)
  setSearched(event.target.value)

  //console.log(event.target.value)

  setShow(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())
   || person.number.includes(event.target.value)))


  //persons.forEach((person) => console.log(person.name === Searched))

}

 //let nimi = "jarmo"

 //console.log(nimi.toUpperCase())



  return (      
    <div>
      <h2>Phonebook</h2>


      <Filter persons={persons} searched={searched} handleSearchChange={handleSearchChange}/>


      <h3>Add a new</h3>


      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      />


      <h3>Numbers</h3>


      <Persons show={show} />
    </div>
  )

}






  

export default App