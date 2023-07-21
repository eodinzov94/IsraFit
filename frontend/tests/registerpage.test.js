import { Builder, By, until } from 'selenium-webdriver'
import assert from 'assert'

describe('Register page tests', function() {
  let driver

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    await driver.get('http://localhost:5173/register')
  })

  after(async function() {
    await driver.quit()
  })

  describe('Register pages elements search', function() {
    it('should load all the elements', async function() {
      await driver.wait(until.elementLocated(By.id('email')), 5000)
      /*
         Check for 1 element from every row, it's enough
       */
      const elementLocators = [
        By.id('email'),
        By.name('password'),
        By.name('firstName'),
        By.name('height'),
        By.name('weight'),
        By.name('physicalActivity'),
      ];
      const elementPromises = elementLocators.map((locator) => driver.findElement(locator));

      const elements = await Promise.all(elementPromises);

      elements.forEach((element, index) => {
        assert(element, `Element with locator ${elementLocators[index]} should exist.`);
      });
    })
  })

  describe('Register page form submission', function() {
    it('should submit the registration form', async function() {
      await driver.wait(until.elementLocated(By.name('firstName')), 5000);

      const firstNameElement = await driver.findElement(By.name('firstName'));
      const lastNameElement = await driver.findElement(By.name('lastName'));
      const emailElement = await driver.findElement(By.id('email'));
      const passwordElement = await driver.findElement(By.name('password'));
      const confirmPasswordElement = await driver.findElement(By.name('confirmPassword'));
      const submitButtonElement = await driver.findElement(By.css('button[type="submit"]'));

      await firstNameElement.sendKeys('Isra');
      await lastNameElement.sendKeys('Fit');
      await emailElement.sendKeys('israfit@react.com');
      await passwordElement.sendKeys('password123');
      await confirmPasswordElement.sendKeys('password123');

      assert.strictEqual(await firstNameElement.getAttribute('value'), 'Isra');
      assert.strictEqual(await lastNameElement.getAttribute('value'), 'Fit');
      assert.strictEqual(await emailElement.getAttribute('value'), 'israfit@react.com');
      assert.strictEqual(await passwordElement.getAttribute('value'), 'password123');
      assert.strictEqual(await confirmPasswordElement.getAttribute('value'), 'password123');

      await submitButtonElement.click();
    });
  });
})
