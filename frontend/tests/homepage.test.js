import { Builder, By, until,  } from 'selenium-webdriver';
import assert from 'assert';

describe('Homepage tests', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:5173');
  });

  after(async function () {
    await driver.quit();
  });

  describe('find search field', function () {
    it('should find the search bar', async function () {
      await driver.wait(until.elementLocated(By.id('search')), 5000);

      const textFieldElement = await driver.findElement(By.id('search'));
      assert(textFieldElement, 'Search should exist.');

      await textFieldElement.sendKeys('milk');

      const insertedValue = await textFieldElement.getAttribute('value');
      assert.strictEqual(
        insertedValue,
        'milk',
        'The value was not inserted correctly into the search field.'
      );

      const milkResult = await driver.wait(until.elementLocated(By.xpath(`//td[contains(text(), 'חלב אם')]`)), 5000);
      assert(milkResult, 'Milk search should have worked.');

    });
  });

  describe('Testing navigation to /login', function () {
    it('should navigate to /login and find "email" TextField', async function () {

      await driver.wait(until.elementLocated(By.id('navToLogin')), 5000);

      const navToLoginButton = await driver.findElement(By.id('navToLogin'));
      await navToLoginButton.click();

      await driver.wait(until.elementLocated(By.id('email')), 5000);

      const emailTextField = await driver.findElement(By.id('email'));
      assert(emailTextField, 'The "email" TextField should exist on the /login page.');
    });
  });
});
