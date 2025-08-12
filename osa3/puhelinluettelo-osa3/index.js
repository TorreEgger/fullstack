require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')



let persons = []

app.use(express.static('dist'))
app.use(express.json())


//tiny-konfiguraatio
app.use(morgan('tiny'))



// used this source on how to to create the .env file
// https://www.reddit.com/r/react/comments/p9a9od/how_to_create_a_env_file/

app.get('/info', (request, response) => {
    let date = Date()
    let count = 0
    /*
    for(let i = 0; i<Person.length; i++) {
        count++
    }
        */
    Person.find({}).then(result => {
        result.forEach(person => {
            count++ 
        })
        response.send(`<p>Phonebook has info for ${count} people</p> <p>${date}</p>`)
    })

    
})


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
        console.log(persons)
    })
})


app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
    
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})


const generateId = () => {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return String(Math.floor(Math.random() * 10000))
}

app.post('/api/persons', (request, response) => {
    console.log(request.body)
    const body = request.body

    if (!body.name && !body.number) {
        return response.status(400).json({
            error: 'no information given'
        })
    }

    if (!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    }

    /*
    if(persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    */

    const person = new Person({
        name: body.name,
        number: body.number    
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

})




const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})