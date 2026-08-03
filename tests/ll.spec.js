import {test, expect} from '@playwright/test';

test('Browser context validating Error login', async ({page}) => {   

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    // await page.getByLabel('Name').fill('Supratik Dey');
    // await page.getByLabel('Email').fill('supratikdeyece08@gmail.com');
    // await page.getByLabel('Password').fill('Learning@830$3mK2');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel("Gender").selectOption('Female');
    // await page.getByRole('button', { name: 'Submit' }).click();
    // const alertText = await page.locator('.alert-success').textContent();
    // console.log(alertText);
    await page.getByPlaceholder("Password").fill('Learning@830$3mK2');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.locator('app-card').filter({ hasText: 'Blackberry' }).locator('text= Add').click() ;
});





test.only('Generate script using codegen', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
  await page.getByText('Checkout ( 2 ) (current)').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('India');
  await page.getByText('I agree with the term &').click();
  await page.locator('form').click();
  await page.getByRole('button', { name: 'Purchase' }).click();
//   await page.getByText('India').click();
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.locator('app-checkout')).toContainText('Please choose your delivery location. Then click on purchase button');
  await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toHaveValue('India');
  await expect(page.getByRole('button', { name: 'Purchase' })).toBeVisible();
});