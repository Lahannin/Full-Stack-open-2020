import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [style, setStyle] = useState('')
  const blogFormRef = React.createRef()


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setStyle('red')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }


  const loginForm = () => (
    <form onSubmit={handleLogin} id='loginForm'>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      }).catch(error => {
        setErrorMessage('Blog was not added. ' + error.response.data.error)
        console.log(error.response.data)
        setStyle('red')
      })

    setErrorMessage(
      `a new blog ${blogObject.title} by ${blogObject.author} added`
    )
    setStyle('green')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }


  const handleLike = async (blog) => {
    blog.likes++
    await blogService.update(blog.id, blog)
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      await blogService.remove(blog.id)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }

  const blogForm = () => (
    <Togglable id='newBlog' buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} style={style}/>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in
            <button id='logOut' onClick={handleLogout}> logout</button>
          </p>
          {blogForm()}
          <br/>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog)} handleRemove={() => handleRemove(blog)} user={user} />)}
        </div>
      }
    </div>
  )
}


export default App