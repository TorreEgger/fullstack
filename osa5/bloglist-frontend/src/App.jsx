import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
//import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
//import blog from '../../backend/models/blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [title, setTitle] = useState('')
  //const [author, setAuthor] = useState('')
  //const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  //console.log(JSON.parse(window.localStorage.getItem('loggedBlogAppUser'), 'loggedin'))

  const noteFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])


  //console.log(blogs[2])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //console.log(user.token)


  blogs.sort((a, b) => b.likes - a.likes)

  const addBlog = async blogObject => {
  //event.preventDefault()
    noteFormRef.current.toggleVisibility()

    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch {
      setErrorMessage('title or url is missing')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  //console.log(user)

  const likeBlog = async id => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = {  user: blog.user.id, likes: blog.likes + 1, author: blog.author, title: blog.title, url: blog.url }
    //luin discorista miten muut oli tätä tehnyt ja promptasin tekoälyä, ja kysyin kaverilta apua. nyt pitäisi toimia
    //oli haasteita saada se toivotunlaiseksi, koska A: pyydettiin lähettämään kaikki kentät
    // ja B: esimerkkikuvassa ei kuitenkaan toivottu, että kaikkia kenttiä olisi mukana: (blog.id, user.name, user.username)
    // kukaan ei forumin sivulla vastannut minun hämmenykseeni asiaan liittyen
    // alkuperäinen ratkaisu siis toimi, mutta tämä on kaiketi eheämpi vastaus ja halutunlainen
    try {
      const likeCHange = await blogService.update(id, changedBlog)
      //console.log(likeCHange, 'changed')
      setBlogs(blogs.map(blog => (blog.id !== id ? blog : likeCHange)))
    } catch {
      setErrorMessage('error happened while liking')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }

  }

  //user id should be found
  const remove = async id => {
    const blog = (blogs.find(blog => blog.id === id))
    console.log(id)
    console.log(blog)
    if (confirm(`Remove ${blog.title} by ${blog.author}`))
      try {
        await blogService.remove(id)
        setNotification(`Blog "${blog.title}" removed`)
        setBlogs(blogs.filter(x => x.id !== id))
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      } catch {
        setErrorMessage('failed')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }

  }




  const handlelogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      //console.log(user)
      setNotification(`${user.name} logged in`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong username or password')
      console.log('error')
      console.log(errorMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }


  const handleLogOut = async event => {
    event.preventDefault()


    try {
      let nimi = user.name
      setUser(null)
      window.localStorage.removeItem('loggedBlogAppUser')
      setNotification(`${nimi} logged out`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch {
      setErrorMessage('logout did not work')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }

  }

  const loginForm = () => (
    <form onSubmit={handlelogin} placeholder="form" >
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



  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} errorMessage={errorMessage} />
        {loginForm()}
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} errorMessage={errorMessage} />
      <p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
      <Togglable buttonLabel='create new blog' ref={noteFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} remove={remove} user={user} />
      )}
    </div>
  )
}

export default App