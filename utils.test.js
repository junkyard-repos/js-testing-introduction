const { checkAndGenerate, generateText, validateInput } = require('./util');
const puppeteer = require('puppeteer');

test('should do something', () => {
  const text = generateText('david', 38);
  expect(text).toBe('david (38 years old)');
});

test('should validate input', () => {
  const validInput = validateInput('david', true, false);
  expect(validInput).toEqual(true);
});

test('should validate input', () => {
  const validInput = validateInput('', true, false);
  expect(validInput).toEqual(false);
});

test('should generate a valid text output', () => {
  const text = checkAndGenerate('david', 38);
  expect(text).toBe('david (38 years old)');
});

test('should click around', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=500, 500']
  });
  const page = await browser.newPage();
  await page.goto(
    'file:///C:/Users/davda/repos/__other/js-testing-introduction/index.html'
  );
  await page.click('input#name');
  await page.type('input#name', 'David');
  await page.click('input#age');
  await page.type('input#age', '38');
  await page.click('#btnAddUser');

  const finalText = await page.$eval('.user-item', el => el.textContent);

  expect(finalText).toBe('David (38 years old)');
});
