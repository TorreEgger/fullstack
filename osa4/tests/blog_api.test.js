const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

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


test.only('all blogs should contain an id correctly', async () => {
  const response = await api.get('/api/blogs')

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  const idOikein = (currentValue) => Object.hasOwn(currentValue, 'id')

  console.log(response.body.every(idOikein))
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



after(async () => {
  await mongoose.connection.close()
})

