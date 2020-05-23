import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [style, setStyle] = useState('') 
  const [loginVisible, setLoginVisible] = useState(false)
 

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
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  
  const handleLogout = event => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
  }

  const handleNewBlog = async event => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    const saveBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(saveBlog));
    await setErrorMessage(
      `a new blog ${saveBlog.title} by ${saveBlog.author} added`
      );
      setStyle('green')
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000) 

    setTitle("");
    setAuthor("");
    setUrl("");
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const createBlogForm = () => (
    <Togglable buttonLabel="A new blog">
    
      
      <h2>Create new</h2>
      <form onSubmit={handleNewBlog}>
      <div>
        title
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>    
    </Togglable>  
  )

  
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} style={style}/>
      
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}> logout</button>
  
        <br></br>

          {createBlogForm()} 

          <br></br>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
      </div>
      }

    
    </div>
  )
          
}
export default App