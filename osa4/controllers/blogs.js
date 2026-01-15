const blogsRouter = require('express').Router()
//const blog = require('../models/blog')
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)


  //console.log(Object.hasOwn(request.body, 'title'))

  if(!blog.likes)
    blog.likes = 0


  if (!Object.hasOwn(request.body, 'title') || (!Object.hasOwn(request.body, 'url')))
    return response.status(400).end()



  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})




module.exports = blogsRouter