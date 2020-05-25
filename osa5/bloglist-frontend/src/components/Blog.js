import React, { useState } from 'react'
import PropTypes from 'prop-types'



const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [blogInfo, setBlogInfo] = useState(false)
  const showWhenExpanded = { display: blogInfo ? '' : 'none' }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={blogStyle}>
      <div className="blog">
        {blog.title} {blog.author}
        <button onClick={() => setBlogInfo(!blogInfo)}>view</button>
      </div>
      <div style={showWhenExpanded} id='fullinfo' className="fullBlog">
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={handleLike}>like</button>
        </p>
        <p>Added by {blog.user.name} </p>
        {blog.user.name === user.name ?
          <button onClick={handleRemove}>remove</button>
          : null}
      </div>
    </div>
  )
}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.object.isRequired,
  handleRemove: PropTypes.array.isRequired,
  user: PropTypes.func.isRequired,
}


export default Blog
