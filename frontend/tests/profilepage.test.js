import { Builder, By, until } from 'selenium-webdriver'
import assert from 'assert'
import { loginData } from './loginData.js'

describe('Profile page tests', function() {
  let driver
  this.timeout(10000)

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    await driver.get('http://localhost:5173/login')
    const emailElement = await driver.findElement(By.id('email'))
    const passwordElement = await driver.findElement(By.name('password'))
    const submitElement = await driver.findElement(By.css('button[type="submit"]'))

    /*  Hardcode values */
    await emailElement.sendKeys(loginData.email)
    await passwordElement.sendKeys(loginData.password)
    await submitElement.click()
  })

  after(async function() {
    await driver.quit()
  })

  describe('find edit profile button', function() {
    it('should find the edit profile button and open it', async function() {
      await driver.wait(until.elementLocated(By.id('editProfileButton')), 5000)

      const editProfileButton = await driver.findElement(By.id('editProfileButton'))
      await editProfileButton.click()

      // Modal should pop up
      const firstNameElement = await driver.findElement(By.name('firstName'))
      assert(firstNameElement, 'Modal did not pop up')

      // Close modal
      const cancelButton = await driver.findElement(By.id('cancelEditProfileButton'))
      await cancelButton.click()
    })
  })

  describe('find the report BMI button', function() {
    it('should find the BMI button and click it', async function() {
      await driver.wait(until.elementLocated(By.id('BMIButton')), 5000)

      const editProfileButton = await driver.findElement(By.id('BMIButton'))
      await editProfileButton.click()

      // Modal should pop up
      const weightElement = await driver.findElement(By.name('weight'))
      assert(weightElement, 'Modal did not pop up')

      // Close modal
      const cancelButton = await driver.findElement(By.id('cancelBMIReportButton'))
      await cancelButton.click()
    })
  })

  describe('find set/change goal button', function() {
    it('should find the goal button and click it', async function() {
      await driver.get('http://localhost:5173')
      await driver.wait(until.elementLocated(By.id('goalButton')), 5000)


      const goalButtonElement = await driver.findElement(By.id('goalButton'))
      await goalButtonElement.click()

      assert.strictEqual(await driver.getCurrentUrl(), 'http://localhost:5173/goal-set', 'URL did not change!')
    })
  })

  describe('find the calories button', function() {
    it('should find the calories button and click it', async function() {
      await driver.get('http://localhost:5173')
      await driver.wait(until.elementLocated(By.id('caloriesButton')), 5000)


      const caloriesButtonElement = await driver.findElement(By.id('caloriesButton'))
      await caloriesButtonElement.click()

      assert.strictEqual(await driver.getCurrentUrl(), 'http://localhost:5173/food-report', 'URL did not change!')
    })
  })

  describe('try to access locked page', function() {
    it('should fail to change url', async function() {
      const currentUrl = await driver.getCurrentUrl()
      await driver.get('http://localhost:5173/food-report')
      const newUrl = await driver.getCurrentUrl()

      assert(currentUrl === newUrl,'URL should not have changed!')
    })
  })
})
