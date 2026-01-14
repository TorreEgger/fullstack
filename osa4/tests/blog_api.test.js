const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})



test('all blogs are returned in JSON-format', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})


test('all blogs should contain an id correctly', async () => {
  const response = await api.get('/api/blogs')

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  const idOikein = (currentValue) => Object.hasOwn(currentValue, 'id')

  //console.log(response.body.every(idOikein))
  /*
  let bool = false
  for (let i = 0; i<response.body.length; i++) {
    console.log(bool)
    bool = Object.hasOwn(response.body[i], '_id')
  }
  */
  //console.log(bool, 'bool')
  assert.strictEqual(response.body.every(idOikein), true)

})


test.only('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Can anything knock China off its mountain?',
    author: 'Noah Smith',
    url: 'https://www.noahpinion.blog/p/can-anything-knock-china-off-its',
    likes: 324
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)


  //console.log(blogsAtEnd[blogsAtEnd.length-1].title, 'title')
  //const titles = blogsAtEnd.map(x => x.title)
  assert.strictEqual(blogsAtEnd[blogsAtEnd.length-1].title, newBlog.title)

})



test('likes will be set to zero if left empty', async () => {

  const newBlog = {
    title: 'Happy more waking that running',
    author: 'Jesse Guth',
    url: 'https://reallynotarunner.com/2025/07/21/happy-more-waking-than-running/',
    likes: null
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()


  assert.strictEqual(blogsAtEnd[blogsAtEnd.length-1].likes, 0)

})


test('blogs missing a title will equate to a bad request (400)', async () => {
  const newBlog = {
    author: 'Noah Smith',
    url: 'https://www.noahpinion.blog/p/roundup-75-checking-in-on-the-bad',
    likes: 51
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)


  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

})



test('blogs missing an url will equate to a bad request (400)', async () => {
  const newBlog = {
    title: 'Adelaide ATP250 R16, Heliövaara/Patten – Schnaitter/Wallner 6-4, 2-6 10-6',
    author: 'Harri Heliövaara',
    likes: null
  }
})



after(async () => {
  await mongoose.connection.close()
})

