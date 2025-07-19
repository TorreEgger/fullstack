import { useState, useEffect } from 'react'
import personService from './services/persons'

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
        {x.name} {x.number} <button onClick={() => props.remove(x.id)}>delete</button>
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
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
        setShow(initialPersons)
       // console.log(response.data)
      })
  },  [])



  const remove = (id) => {
    const person = (persons.find(person => person.id === id))
    console.log(person.name)
    if(confirm('Delete ' + person.name + ' ?'))
      personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(x => x.id !== response.id))
          setShow(persons.filter(x => x.id !== response.id))
        })
  }

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


  if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase()))
    return alert(`${newName} is already added to phonebook`)

  const nameObject = {
    name: newName,
    number: newNumber
  }

  personService
    .create(nameObject)
      .then(returnedPerson => {
       setPersons(persons.concat(returnedPerson))
       setShow(persons.concat(returnedPerson))
       setNewName('')
       setNewNumber('')
  })


 /* setPersons(persons.concat(nameObject))
  setShow(persons.concat(nameObject))
  setNewName('')
  setNewNumber('')
  */


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


      <Persons show={show} remove={remove} />
    </div>
  )

}






  

export default App