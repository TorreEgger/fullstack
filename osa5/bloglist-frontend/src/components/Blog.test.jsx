import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  //console.log(element2)

  expect(element2).toBeNull()


  const element3 = screen.queryByText(
    '291', { exact: false }
  )

  expect(element3).toBeNull()
})

test('if view-button is pressed, every field is shown', async () => {
  const blog = {
    title: 'reading is rewarding',
    author: 'Josh Fox',
    url: 'https://readersopinion',
    likes: 103,
    user: {
      username: 'keijo',
      name: 'keke',
      id: '6994284305971abb49d1dfdc'
    }
  }

  const user = {
    user: {
      username: 'keijo',
      name: 'keke',
      id: '6994284305971abb49d1dfdc'
    }
  }

  console.log(user.user.name)
  console.log(blog.user.name)

  //const mockHandler = vi.fn()


  render(<Blog blog={blog} user={user.user} />)


  const kayttaja = userEvent.setup()

  const button = screen.getByText('view')
  await kayttaja.click(button)

  //screen.debug()

  const element = screen.getByText(
    'https://readersopinion', { exact: false }
  )

  expect(element).toBeDefined()

  const element2 = screen.getByText(
    '103', { exact: false }
  )

  expect(element2).toBeDefined()


  const element3 = screen.getByText(
    'keke', { exact: false }
  )

  expect(element3).toBeDefined()

})
