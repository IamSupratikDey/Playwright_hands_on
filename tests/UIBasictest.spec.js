const {test, expect} = require('@playwright/test');



test.only('Browser context playwright test', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await page.locator('#username').fill('rahulsh');
    await page.locator('#password').fill('learning');
    await page.locator('#terms').click();
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator('.alert-danger')).toHaveText('Incorrect username/password.');
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password..');

});

 test('Page playwright test', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle(/rahulshettyacademy/);
});