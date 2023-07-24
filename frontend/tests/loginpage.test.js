import { Builder, By, until } from 'selenium-webdriver'
import assert from 'assert'

describe('Login page tests', function() {
  let driver
  this.timeout(10000)

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    await driver.get('http://localhost:5173/login')
  })

  after(async function() {
    await driver.quit()
  })

  describe('Login pages elements search', function() {
    it('should find the email & password elements', async function() {
      await driver.wait(until.elementLocated(By.id('email')), 5000)

      const emailElement = await driver.findElement(By.id('email'))
      assert(emailElement, 'Email field should exist.')

      const passwordElement = await driver.findElement(By.name('password'))
      assert(passwordElement, 'Password field should exist.')

      const submitElement = await driver.findElement(By.css('button[type="submit"]'))
      assert(submitElement, 'Submit button not found.')
    })
  })

  describe('Fail a login', function() {
    it('attempts to login and fails', async function() {
      /*
      This test will fail not because the values were incorrectly formatted, but rather because there won't be a truthy
      response from the backend.
       */
      await driver.wait(until.elementLocated(By.id('email')), 5000)
      const emailElement = await driver.findElement(By.id('email'))
      const passwordElement = await driver.findElement( By.name('password'))
      const submitElement = await driver.findElement(By.css('button[type="submit"]'))

      await emailElement.sendKeys('test@test.test')
      await passwordElement.sendKeys('test')

      assert(await emailElement.getAttribute('value') === 'test@test.test', 'The email was not inserted correctly.')
      assert(await passwordElement.getAttribute('value') === 'test', 'The password was not inserted correctly.')

      await submitElement.click()

      // Wait for the error message to appear and check if it's visible
      const errorMessageLocator = By.css('.MuiAlert-message')
      try {
        await driver.wait(until.elementLocated(errorMessageLocator), 10000)
        const errorMessageElement = await driver.findElement(errorMessageLocator)
        const isVisible = await errorMessageElement.isDisplayed()
        assert(isVisible, 'Error message should be visible.')
      } catch (error) {
        assert.fail('Error message should be visible.')
      }
    })
  })

  describe('Check redirection to homepage', function() {
    it('should just redirect to homepage', async function() {
      await driver.wait(until.elementLocated(By.name('password')), 5000)
      const redirectElement = await driver.findElement(By.css('a.MuiBox-root.css-mv5f6b'))
      await redirectElement.click()

      // Should redirect to foodtablepage
      const textFieldElement = await driver.findElement(By.id('search'))
      assert(textFieldElement, 'Search should exist.')
    })
  })
})
