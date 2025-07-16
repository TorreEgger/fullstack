import { useState, useEffect } from 'react'
import axios from 'axios'


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
      <p key={x.id}>
        {x.name} {x.number}
      </p>
      )}
    </div>

  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [searched, setSearched] = useState('')

  const [show, setShow] = useState(persons)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setShow(response.data)
       // console.log(response.data)
      })
  },  [])



/*
axios
  .get('http://localhost:3001/persons')
  .then(response => {
    const notes = response.data
    console.log(notes)
  })

  */





  

const addPerson = (event) => {
  event.preventDefault()


  if (persons.find(person => person.name === newName))
    return alert(`${newName} is already added to phonebook`)

  const nameObject = {
    name: newName,
    number: newNumber,
    id: String(persons.length+1)
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