const { test, expect } = require('@playwright/test');

const MENU_HTML = `
  <ul id="menu">
    <li><a href="#home" data-testid="menu-home">Home</a></li>
    <li><a href="#products" data-testid="menu-products">Products</a></li>
    <li><a href="#about" data-testid="menu-about">About</a></li>
    <li><a href="#contact" data-testid="menu-contact">Contact</a></li>
  </ul>
`;

const TRAP_HTML = `
  <div>
    <h2>Title</h2>
    <p>First</p>
    <p>Second</p>
  </div>
`;

const TABLE_HTML = `
  <table>
    <tr><td>Alice</td><td>30</td></tr>
    <tr><td>Bob</td><td>25</td></tr>
    <tr><td>Carol</td><td>41</td></tr>
  </table>
`;

test('1. nth(), first(), last()', async ({ page }) => {
  await page.setContent(MENU_HTML);
  const item = page.locator('#menu li');

  await expect(item.first()).toHaveText('Home');
  await expect(item.nth(0)).toHaveText('Home');
  await expect(item.nth(1)).toHaveText('Products');
});

test('nth-child()', async({page}) =>{
  await page.setContent(MENU_HTML);
  await expect(page.locator('#menu li:nth-child(1)')).toHaveText('Boobs');
  await expect(page.locator('#menu li:nth-child(2)')).toHaveText('Products');
})