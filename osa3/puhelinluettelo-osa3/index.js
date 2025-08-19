require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')



let personsArray = []

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
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id '})
    })
})


app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => {
        return response.status(400).send({ error: 'malformatted id '})
    })
})
    


const generateId = () => {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return String(Math.floor(Math.random() * 10000))
}


    /*
       if(personsArray.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
        return response.status(400).send({ error: 'name must be unique'})
    }
        */



app.post('/api/persons', (request, response) => {
    console.log(request.body)
    const body = request.body

        //tässä poimitaan nuo henkilöt taulukkoon, että virheenkäsittely onnistuu helpommin post-metodissa
     Person.find({}).then(persons => {
        personsArray = persons
       // console.log(personsArray)
    })

    if (!body.name && !body.number) {
        return response.status(400).json({
            error: 'no information given' })
    }

    if (!body.name) {
        return response.status(400).json({
            error: 'name is missing' })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number is missing' })
    }

    if(personsArray.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
        return response.status(400).json({ error: 'name must be unique'})
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

/*
app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findById(request.params.id)
    .then(person => {
        if (!person) {
            return response.status(404).end()
        }

        person.name = name
        person.number = number

        return person.save().then((updatedPerson) => {
            response.json(updatedPerson)
        })
    })
    .catch(error => next(error))
})
    
*/


// oletattomia osoitteita varten. ei kuulu virheiden käsittelyyn
const unknownEndpoint = (request, response) => {
    return response.status(404).send({ error: 'unknown endpoint'})
}


app.use(unknownEndpoint)






const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})