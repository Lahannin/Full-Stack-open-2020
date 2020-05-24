import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'



const testBlog = {
  title: 'Testataan',
  author: 'Testaaja',
  url: 'testaus.fi',
  likes: 1,

}
const testUser = {
  username: 'user',
  name: 'name'
}

afterEach(cleanup)


test('only the title and author are visible by default', () => {
  const component = render(
    <Blog blog={testBlog} user={testUser} />
  )
  const titleAuthor = component.container.querySelector('.blog')
  expect(titleAuthor).toHaveTextContent('Testataan Testaaja')

  const info = component.container.querySelector('.fullBlog')
  expect(info).not.toBeVisible()
})

test('URL and likes are shown when the button controlling the shown details has been clicked.', () => {
  const component = render(
    <Blog blog={testBlog} user={testUser} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const info = component.container.querySelector('.fullBlog')
  expect(info).toHaveTextContent('URL: testaus.fi')
  expect(info).toHaveTextContent('Likes: 1')
})

test('Double clickof like button', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={testBlog} user={testUser} handleLike={mockHandler}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls.length).toBe(2)

})