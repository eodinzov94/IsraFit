import { Builder, By, until } from 'selenium-webdriver'
import assert from 'assert'
import { loginData } from './loginData.js'

describe('Goal chart tests', function() {
  let driver

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    await driver.get('http://localhost:5173/login')
    const submitElement = await driver.findElement(By.css('button[type="submit"]'))
    const emailElement = await driver.findElement(By.id('email'))
    const passwordElement = await driver.findElement(By.name('password'))

    /*  Hardcode values */
    await emailElement.sendKeys(loginData.email)
    await passwordElement.sendKeys(loginData.password)
    await submitElement.click()
  })

  after(async function() {
    await driver.quit()
  })

  describe('find the canvas', function() {
    it('should find the canvas', async function() {
      await driver.wait(until.elementLocated(By.xpath('//a[@href="/calories-chart"]')), 5000)
      await driver.findElement(By.xpath('//a[@href="/calories-chart"]')).click();
      assert.strictEqual(await driver.getCurrentUrl(), 'http://localhost:5173/calories-chart', 'URL did not change!');

      await driver.wait(until.elementLocated(By.id('canvas')), 5000);
      const canvasElement = await driver.findElement(By.id('canvas'));
      assert(canvasElement, 'Canvas did not load!');
    });
  });

  describe('Check redirection to homepage', function() {
    it('should just redirect to homepage', async function() {
      const redirectElement = await driver.findElement(By.css('a.MuiBox-root.css-mv5f6b'))
      await redirectElement.click()

      // Should redirect to dashboard
      await driver.wait(until.elementLocated(By.id('editProfileButton')), 5000)

      const editProfileButton = await driver.findElement(By.id('editProfileButton'))
      await editProfileButton.click()
    })
  })
})
