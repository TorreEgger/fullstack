require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')



app.use(express.static('dist'))
app.use(express.json())


//tiny-konfiguraatio
app.use(morgan('tiny'))



// tutoriaalissa oli ongelmia miten .env-tiedosto luodaan, kun visual studio pisti sen txt-tyyppiseksi. sitten katsoin täältä miten se tehdään
// https://www.reddit.com/r/react/comments/p9a9od/how_to_create_a_env_file/
// nyt kuitenkin siirsin sisällön uuteen tiedostoon, nimesin sen .evn ja uudelleennimesin sen file explorerissa

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
        response.status(400).send({ error: 'malformatted id'})
    })
})


// had to watch for 3.15 how i did this previously
app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id'})
    })
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

   
    // https://www.mongodb.com/docs/manual/reference/operator/query/regex/#std-label-regex-case-insensitive
    // Täältä katsottu apua, että miten regexillä saa tuon haun tunnistamaan merkkijonot riippumatta "casesta"
    Person.findOne({ name: { $regex: body.name, $options: 'i' }}).then(result => {
        if(result)
            return response.status(400).json({
                error: 'name must be unique' })
        
        const person = new Person({
        name: body.name,
        number: body.number    
        })

          person.save().then(savedPerson => {
          response.json(savedPerson)
        })
    })

})


    

// oletattomia osoitteita varten. ei kuulu virheiden käsittelyyn
const unknownEndpoint = (request, response) => {
    return response.status(404).send({ error: 'unknown endpoint'})
}


app.use(unknownEndpoint)

/*
const errorHandler = (error, request, response, next) => {

    console.log('tähän errorHandlerin tulostus', error.message)


    if (error.name === 'CastError') {
        console.log(error)
        return response.status(400).send({ error: 'malformatted id'})
    }

    
    if (error === 'no information given') {
        console.log(error)
        return response.status(400).send({ error: 'no information given'})
    }


    if (error === 'name is missing') {
        console.log(error)
        return response.status(400).send({ error: 'name is missing'})
    }


    if (error === 'number is missing') {
        console.log(error)
        return response.status(400).send({ error: 'number is missing'})
    }


    if (error === 'name must be unique') {
        console.log(error)
        return response.status(400).send({ error: 'name must be unique'})
    }
        


    
    if (error.message === 'unknown endpoint') {
        console.log(error)
        return response.status(404).send({ error: 'unknown endpoint'})
    }

    
        
        

    //console.log(next(error))
    next(error)

}



app.use(errorHandler)

*/


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})