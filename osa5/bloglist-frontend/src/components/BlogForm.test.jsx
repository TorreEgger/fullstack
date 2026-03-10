import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'



test('form calls the function it receives with the right data', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)


  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')

  const createButton = screen.getByText('create')

  await user.type(title, 'How to slice better')
  await user.type(author, 'Max Johnson')
  await user.type(url, 'https://tennispalace.com')

  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  //console.log(createBlog.mock.calls[0][0].title)
  expect(createBlog.mock.calls[0][0].title).toBe('How to slice better')
  expect(createBlog.mock.calls[0][0].author).toBe('Max Johnson')
  expect(createBlog.mock.calls[0][0].url).toBe('https://tennispalace.com')

})
