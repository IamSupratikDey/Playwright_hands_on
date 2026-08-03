const {test, expect} = require('@playwright/test');



test('Browser context playwright test', async ({browser}) => {

    
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const password = page.locator('#password');
    const terms = page.locator('#terms');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await page.locator('#username').fill('rahul');
    await page.locator('#password').fill('Lea$3mK2');
    await page.locator('#terms').click();
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');

    await userName.fill("");
    await password.fill("");
    await userName.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await terms.click();
    await signInBtn.click();
    console.log (await cardTitles.first().textContent());
    console.log (await cardTitles.nth(0).textContent());

    const allTitles =await cardTitles.allTextContents();
    console.log(allTitles);



});

 test('Page playwright test', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle(/rahulshettyacademy/);
});

test("UI Controls", async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');       
    const dropdown = page.locator("select.form-control");
    const radioButtons = page.locator(".radiotextsty");
    const popUP = page.locator("#okayBtn");
    const terms = page.locator('#terms');
    const documnentationLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    console.log(await dropdown.inputValue());
    await expect(dropdown).toHaveValue("consult");
    await radioButtons.last().click();
    await popUP.click();
    await expect(radioButtons.last()).toBeChecked();
    await terms.click();
    await expect(terms).toBeChecked();
    await terms.uncheck();
    await expect(terms).not.toBeChecked();
    await expect(documnentationLink).toHaveAttribute("class", "blinkingText");
    await page.pause();
    
});

/**
 * This code will teach us how to handle child windows in Playwright. When we click on the documentation link, it will open a new tab and we need to switch to that new tab and then we can perform the actions on that new tab. So we need to use the context.waitForEvent('page') to wait for the new page to be opened and then we can perform the actions on that new page.
 */

test.only("Child Window Handling", async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');   
    const documnentationLink = page.locator("[href*='documents-request']");


    const [newpage] = await Promise.all(
        [
            context.waitForEvent('page'), // listening for the new page event to be fired, so that it will wait for the new page to be opened and then it will execute the next line of code.
            documnentationLink.click()
        ]
    );

    /**
     * Because the new page is opened in a new tab, so we need to switch to the new page and then we can perform the actions on the new page. So we need to use the context.waitForEvent('page') to wait for the new page to be opened and then we can perform the actions on the new page.
     */
    const text = await newpage.locator(".red").textContent();
    const arrayText = text.split("@");
    const email = arrayText[1].split(" ")[0];
    // console.log(email);

    page.locator("#username").fill(email);
    await page.pause();
    console.log(await page.locator("#username").inputValue());
}
);