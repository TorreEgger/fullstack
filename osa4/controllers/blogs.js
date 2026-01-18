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


//https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status#successful_responses
blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blogs = await Blog.find({})
  const ids = blogs.map(b => b.id)


  if (!ids.includes(request.params.id))
    return response.status(404).end()


  const toChange = await Blog.findById(request.params.id)


  if (title)
    toChange.title = title
  if (author)
    toChange.author = author
  if (url)
    toChange.url = url
  if (likes)
    toChange.likes = likes

  const savedBlog = await toChange.save()
  response.json(savedBlog)


})




module.exports = blogsRouter