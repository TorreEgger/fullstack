const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
//const blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')


const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


describe('correct format-testing', () => {

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



  test('a valid blog can be added', async () => {
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
})

describe('incorrect/missing data testing in post-method', () => {

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
      title: 'TENACITY',
      author: 'JASON JUNG',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

  })
})



describe('tests regarding delete', () => {

  // poistamisen toteutus myös samanlainen kuin kurssilla
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)


    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map(b => b.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })


  test('no blog will be deleted if id is wrong', async () => {

    const blogsAtStart = await helper.blogsInDb()

    await api.delete('/api/blog/4').expect(404)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
  })

})

describe('tests regarding put-method', () => {


  test('the content of a blog can be changed', async () => {

    const blogsAtDb = await helper.blogsInDb()
    const blogToModify = blogsAtDb[0]


    blogToModify.likes = 500


    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(blogToModify)
      .expect(200)


    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(500, blogsAtEnd[0].likes)



  })


  test('the content of a blog will not be changed if the data is invalid', async () => {
    const blogsAtDb = await helper.blogsInDb()
    const blogToModify = blogsAtDb[0]


    blogToModify.likes = 'mansikki'


    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(blogToModify)
      .expect(400)


    const blogsAtEnd = await helper.blogsInDb()
    assert(blogsAtEnd[0].likes !== blogToModify.likes)
  })

  test('the content of any blog will not be changed if id is wrong', async () => {
    const blogsAtDb = await helper.blogsInDb()
    const blogToModify = blogsAtDb[0]

    await api
      .put('/api/blogs/4')
      .send(blogToModify)
      .expect(404)

    assert.deepStrictEqual(blogToModify, blogsAtDb[0])

  })

})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })


  test('creating a new user works if data is correct ', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jelpe',
      name: 'Eevert Salminen',
      password: 'alberto'
    }


    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
    assert(newUser.username.length >= 3)
    assert(newUser.password !== null)
  })



  test('creation of a new user fails if the username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ke',
      name: 'keijo',
      password: 'keijokekäläinen'
    }


    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    //console.log(result.body.error)
    assert(result.body.error.includes('`username` (`ke`, length 2) is shorter than the minimum allowed length'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })


  test('creation of a new user fails if the username is left empty', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: null,
      name: 'maija',
      password: 'nenä'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    //console.log(result.body.error)
    assert(result.body.error.includes('`username` is required'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })


  test('creation of a new user fails if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'patrick',
      password: 'verisikret'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)



    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })


  test('creation of a new user fails if password is left empty', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jepadetskaja',
      name: 'jyrki',
      password: null
    }


    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)


    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('password is missing'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })


  test.only('creation of a new user fails if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'hansvälkky',
      name: 'hans välimäki',
      password: 'k2'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('password should be atleast 3 characters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

})


after(async () => {
  await mongoose.connection.close()
})

