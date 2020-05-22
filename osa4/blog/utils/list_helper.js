const dummy = (blogs) => {
  return 1

}

const totalLikes = (blogs) => {
  let initialValue = 0
  let sum = blogs.reduce(function (accumulator, currentBlog) {
    return accumulator + currentBlog.likes
  }, initialValue)

  return sum
}

const favoriteBlog = (blogs) => {
  let initialValue = 0
  let blogWithMostLikes = ''
  blogs.reduce(function (allBlogs, currentBlog) {
    if (currentBlog.likes > initialValue) {
      initialValue = currentBlog.likes
      blogWithMostLikes = currentBlog
    }
  })
  return {
    'title': blogWithMostLikes.title,
    'author': blogWithMostLikes.author,
    'likes': blogWithMostLikes.likes
  }
}

const MostBlogs = (blogs) => {
  let bloggers = []
  blogs.forEach((element) => {
    bloggers.push(element.author)
  })
  var mf = 1
  var m = 0
  var item
  for (var i=0; i<bloggers.length; i++)
  {
    for (var j=i; j<bloggers.length; j++)
    {
      if (bloggers[i] === bloggers[j])
        m++
      if (mf<m)
      {
        mf=m
        item = bloggers[i]
      }
    } m=0
  }
  return {
    author: item,
    likes: mf
  }

}


const mostLikes = (blogs) => {
  let initialValue = 0
  let blogWithMostLikes = ''
  blogs.reduce(function (allBlogs, currentBlog) {
    if (currentBlog.likes > initialValue) {
      initialValue = currentBlog.likes
      blogWithMostLikes = currentBlog
    }
  })
  return {
    'title': blogWithMostLikes.title,
    'author': blogWithMostLikes.author,
    'likes': blogWithMostLikes.likes
  }
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  MostBlogs,
  mostLikes
}