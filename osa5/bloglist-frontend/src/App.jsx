import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



const addBlog = async event => {
  event.preventDefault()


  const newBlog = await blogService.create({ title, author, url })
  setBlogs(blogs.concat(newBlog))
   setTitle('')
   setAuthor('')
   setUrl('')
}


  const handlelogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.log('error')
    }
  }

  const handleLogOut = async event => {
    event.preventDefault()

    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const loginForm = () => (
    <form onSubmit={handlelogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>
          title: 
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )








  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App