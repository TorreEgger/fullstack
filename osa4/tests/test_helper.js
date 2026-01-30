const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'a Nobel for thinking about long-term growth',
    author: 'Noah Smith',
    url: 'https://www.noahpinion.blog/p/a-nobel-for-thinking-about-long-term',
    likes: 289
  },
  {
    title: 'Smooth numbers and max-entropy',
    author: 'Terence Tao',
    url: 'https://terrytao.wordpress.com/2025/09/15/smooth-numbers-and-max-entropy/',
    likes: 2
  }
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initialBlogs, blogsInDb, usersInDb
}
