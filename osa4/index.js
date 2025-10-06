require ('dotenv').config()
//const express = require('express')
const app = require('./app')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
//const Blog = require('./models/blog')




//https://www.reddit.com/r/react/comments/p9a9od/how_to_create_a_env_file/

//const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)


//app.use(express.json())

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  next()
}

app.use(requestLogger)

/*
app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})


//päätin pistää virheenkäsittelyn tähän, niin saa laajenettua enemmän eri moduuleihin
app.post('/api/blogs', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
    .catch(error => next(error))
})

*/

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)

}

app.use(errorHandler)



app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})