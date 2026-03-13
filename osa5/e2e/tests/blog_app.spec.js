const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByRole("heading", {name: 'Log in to application '})
    await expect(locator).toBeVisible()
    
    const field1 = page.getByRole('textbox', { name: 'username' })
    await expect(field1).toBeVisible()
    const field2 = page.getByRole('textbox', { name: 'password '} )
    await expect(field2).toBeVisible()
    const button = page.getByRole('button', { name: 'login '})
    await expect(button).toBeVisible()


  })
})