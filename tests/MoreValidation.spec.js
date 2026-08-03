const {test, expect} = require('@playwright/test');


test('PopUp validation', async ({page}) => {


    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.goto('https://www.google.com/');
    await page.goBack();
    // await page.goForward(); 
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
     /**
      * Hover in playwright
      */
    
     await page.locator("#mousehover").hover();

     const framesPage=page.frameLocator("#courses-iframe");

     /**
      * Click on onl y visible element in playwright
      */
     framesPage.locator("li a[href*='life-time-access']:visible").click();
     const textCheck=await framesPage.locator(".text h2").waitFor();
     console.log(textCheck.split(" ")[1]);
});