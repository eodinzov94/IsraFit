import { Builder, By, until } from 'selenium-webdriver'
import assert from 'assert'

describe('Not found page tests', function() {
  let driver
  this.timeout(10000)

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build()
  })
  after(async function() {
    await driver.quit()
  })

  describe('try some fake slug', function() {
    it('should go to the not found page', async function() {
      await driver.get('http://localhost:5173/someboguspage')
      const homeElement = await driver.wait(until.elementLocated(By.css('button[type="button"]')), 5000);
      assert(homeElement, 'Did not reach the page correctly!')
    })
  })

  describe('go back to homepage', function() {
    it('should go back to the homepage', async function() {
      await driver.wait(until.elementLocated(By.css('button[type="button"]')), 5000)
      const homeElement = await driver.wait(until.elementLocated(By.css('button[type="button"]')), 5000);
      await homeElement.click()

      assert.strictEqual(await driver.getCurrentUrl(), 'http://localhost:5173/', 'Did not redirect to the homepage!');
    })
  })

})
