const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

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

  //5.17
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

  //5.18
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      const successDiv = page.locator('.success')
      await expect(successDiv).toContainText('Matti Luukkainen logged in')
      await expect(successDiv).toHaveCSS('border-style', 'solid')
      await expect(successDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'väärä')
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })
})