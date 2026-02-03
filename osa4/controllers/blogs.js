const blogsRouter = require('express').Router()
//const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})


/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
*/



//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
blogsRouter.post('/', async (request, response) => {

  console.log(request.token, 'request')


  if (!Object.hasOwn(request.body, 'title') || (!Object.hasOwn(request.body, 'url')))
    return response.status(400).end()


  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })



  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
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

  /*
  console.log(toChange.title, 'muutettava')
  console.log(toChange.author, 'muutettava')
  console.log(toChange.url, 'muutettava')
  console.log(toChange.likes, 'muutettava')
  */


  //console.log(toChange, 'muutettava')
  // console.log(request.body, 'data')

  /*
  if (title)
    toChange.title = title
  if (author)
    toChange.author = author
  if (url)
    toChange.url = url
  if (likes)
    toChange.likes = likes
  */

  //luin vitososaa eteenpäin ja muualta, että kaikki kentät pitäisi huomioida, vaikka kyseisestä kenttää ei haluttaisi muuttaa
  toChange.title = title
  toChange.author = author
  toChange.url = url
  toChange.likes = likes

  const savedBlog = await toChange.save()
  response.json(savedBlog)


})




module.exports = blogsRouter