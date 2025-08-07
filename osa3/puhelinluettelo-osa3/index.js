const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())


let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423123"
    }
]


app.use(express.json())


//tiny-konfiguraatio
app.use(morgan('tiny'))


app.get('/info', (request, response) => {
    let date = Date()
    let count = 0
    for(let i = 0; i<persons.length; i++) {
        count++
    }
    response.send(`<p>Phonebook has info for ${count} people</p>
                    <p>${date}</p>`
    )
})


app.get('/api/persons', (request, response) => {
    console.log(persons)
    response.json(persons)
})


app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
         response.json(person)
    } else {
        response.status(404).end()
    }
    
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

    if(persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }


    persons = persons.concat(person)

    response.json(person)

})




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})