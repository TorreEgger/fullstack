import { useState } from 'react'

const Blog = ({ blog }) => {

  const [view, setView] = useState(true)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyle: 'none'
  }

  //console.log(blog.user)


  if (view === false) {

    //console.log(view, 'false branch')
    return (
    <div style={blogStyle}>
       <li>{blog.title} {blog.author} <button onClick={() => setView(!view)}>hide</button></li>
       <li>{blog.url}</li>
       <li>likes {blog.likes} <button>like</button></li>
       <li>{blog.user.name}</li>
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