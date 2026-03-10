import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title but not title or url', () => {
  const blog = {
    title: 'Blogs are fun to read',
    author: 'Jerry Maxwell',
    url: 'https://blogs.com',
    likes: 291
  }

  render(<Blog blog={blog} />)

  //screen.debug()


  const element = screen.getByText(
    'Blogs are fun to read', { exact: false }
  )

  //console.log(element)

  expect(element).toBeDefined()

  const element2 = screen.queryByText(
    'https://blogs.com', { exact: false }
  )

  console.log(element2)

  expect(element2).toBeNull()


  const element3 = screen.queryByText(
    '291', { exact: false }
  )

  expect(element3).toBeNull()



})