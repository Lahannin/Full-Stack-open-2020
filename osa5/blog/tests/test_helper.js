const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Test',
    author: 'Test Testersson',
    url: 'test.fi',
    likes: 5,
  },
  {
    title: 'World best blog',
    author: 'Write Writer',
    url: 'best.fi',
    likes: 10000,
  }
]

const nonExistingId = async () => {
  const note = new Blog({ content: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}