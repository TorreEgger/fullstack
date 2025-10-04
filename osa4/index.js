require ('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

//https://www.reddit.com/r/react/comments/p9a9od/how_to_create_a_env_file/

const app = express()

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})


//pistin tämän lisäämään siisteyttä, kuten viime osassa
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Blog = mongoose.model('Blog', blogSchema)


const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)


app.use(express.json())

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  next()
}

app.use(requestLogger)


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


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)

}

app.use(errorHandler)


const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})