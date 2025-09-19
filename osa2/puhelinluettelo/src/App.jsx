import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [searched, setSearched] = useState('')

  const [show, setShow] = useState([])

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)




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
          console.log(persons)
          console.log(response.data)
          console.log(persons.filter(x => x.id !== id))
          setPersons(persons.filter(x => x.id !== id))
          setShow(persons.filter(x => x.id !== id))
          setMessage(
            `Person '${person.name}' has been removed`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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

const replace = (parameter) => {
  const id = parameter.id
  const person = persons.find(person => person.id === id)
  console.log(parameter)

 // console.log(id)

  const changedNumber = { ...person, number: newNumber}

  console.log('replacessa', changedNumber)
  

  personService
    .update(id, changedNumber)
    .then(response => {
      console.log('response', response)
      console.log((persons.map(person => person.id !== id ? person : response)))
      setPersons(persons.map(person => person.id !== id ? person : response))
      setShow(persons.map(person => person.id !== id ? person : response))
      setNewName('')
      setNewNumber('')
      setMessage(
          `Number of '${response.name}' has been changed from '${parameter.number}' to '${response.number}'`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
    })
    .catch(error => {
      setErrorMessage(`Information of ${parameter.name} has already been deleted from server`)
      setTimeout(() => {
        setErrorMessage(null)
         }, 5000)
      setPersons(persons.filter(x => x.id !== id))
      setShow(persons.filter(x => x.id !== id))
      setNewName('')
      setNewNumber('')
    })

}
    

  

const addPerson = (event) => {
  event.preventDefault()

  console.log(event)
  const parameter = (persons.find(person => person.name.toLowerCase() === newName.toLowerCase()))


  if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase()))
    if((confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)))
        return replace(parameter)
      else {
        setNewName('')
        setNewNumber('')
        return
      }

      
      
        
  //const nimi = persons.find(person => person.name === newName)

  //console.log(nimi.id)


  const personObject = {
    name: newName,
    number: newNumber
  }

  personService
    .create(personObject)
      .then(returnedPerson => {
       setPersons(persons.concat(returnedPerson))
       setShow(persons.concat(returnedPerson))
       setNewName('')
       setNewNumber('')
          setMessage(
          `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
  })
  .catch(error => {
    console.log(error.response.data)
   //console.log(error.response.data.error)
    setErrorMessage(error.response.data.error)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    
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
      
      <Notification message={message} errorMessage={errorMessage} />


      <Filter searched={searched} handleSearchChange={handleSearchChange}/>


      <h3>Add a new</h3>


      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}/>


      <h3>Numbers</h3>


      <Persons show={show} remove={remove} />
    </div>
  )

}






  

export default App