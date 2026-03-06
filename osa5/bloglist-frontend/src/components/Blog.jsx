import { useState } from 'react'

const Blog = ({ blog, likeBlog, remove, user }) => {

  const [view, setView] = useState(true)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyle: 'none'
  }




  const removeButton = () => {
    if (user.name === blog.user.name) {
      return <button onClick={() => remove(blog.id)}>remove</button>
    }
  }


  //console.log(blog.user, 'blog')
  //console.log(user.token, 'user')


  if (view === false) {
    //console.log(user, 'backend')
    //console.log(blog, 'blogi')
    //console.log(window.localStorage.getItem('loggedBlogAppUser'))

    //console.log(view, 'false branch')
    return (
      <div style={blogStyle}>
        <li>{blog.title} {blog.author} <button onClick={() => setView(!view)}>hide</button></li>
        <li>{blog.url}</li>
        <li>likes {blog.likes} <button onClick={() => likeBlog(blog.id)}>like</button></li>
        <li>{blog.user.name}</li>
        <li>{removeButton()}</li>
      </div>
    )
  }


  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setView(!view)}>view</button>
      </div>
    </div>
  )
}


export default Blog