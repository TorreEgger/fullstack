//const logger = require('../utils/middleware')
const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', (request, response) => {
  Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user
  //console.log(user, 'router')
  const blog = new Blog(request.body)

  blog.likes = blog.likes | 0
  blog.user = user._id

  if (!blog.title || !blog.url) {
    return response.status(400).send({ error: 'title or url missing' })
  }

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  const savedBlog = await blog.save()

  await savedBlog.populate('user', { username: 1, name: 1 })
    return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  //console.log(user)
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(204).end()
  }

  console.log(blog)

  if (user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: 'user not authorized' })
  }

  user.blogs = user.blogs.filter(b => b.id.toString() !== blog.id.toString())

  await blog.deleteOne()
  response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, user } = request.body
  //const user = request.user //uusi
  //logger.info(request.body, 'request body')
  //console.log(request.body, 'requestbody')

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes
  blog.user = user // foorumilta ja tekoäly-malleilta opittua, put-metodissa pitää siis kaikkia kentät muuttaa/päivittää
  // mutta tehtävänanto oli mielestäni sekava. aluksi pyydettiin lähettämään kaikki kentät, mutta sitten blogin id ja userin kaksi muuta kenttää (name, username)
  // ei kuitenkaan sisällytetty esimerkki-dataan
  // minullahan toimi jo alkuperäinenkin ratkaisu, mutta nämä lisäykset varmaankin tekevät vastauksesta eheämmän

  //olen myöskin ymmärtänyt, että pienet eroavaisuudet eivät haittaa, joten omatoiminen tehtävän parantaminen ei varmaankaan ole ongelma
  

  //console.log(user)

  const updatedBlog = await blog.save()
  console.log(blog, 'blog')

  //console.log(blog, 'blog')


  await updatedBlog.populate('user', { username: 1, name: 1 })
  //console.log(updatedBlog, 'updated')
  response.json(updatedBlog)
})

module.exports = blogsRouter