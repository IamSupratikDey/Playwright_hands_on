/**
 * Login UI -> .json file -> API testing -> UI testing
 * Here I am using the token generated from the login API call to add the product to the cart, and then I am verifying the order ID in the UI, so that I can verify that the product is added to the cart successfully.
 * test browser context -> add token to the local storage -> then we can use that token in the UI testing to verify the order details in the order history
 * 
 */

const {test, expect, request} = require('@playwright/test');
let webContext;

test.beforeAll( async ({browser})=>
{   
    /**
     * cookies should be added to the browser context, so that it will be available for all the pages in the browser context, 
     * here I am using addInitScript to add the token to the local storage, so that it will be available for all the pages in the browser context.
     */
    const context = await browser.newContext(); 
    const page = await context.newPage();
    const email = "supratikdeyece08@gmail.com";
    const products = page.locator(".card-body");  
    const userName = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginButton = page.locator("#login");
    const cardTitles = page.locator('.card-body  b');
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await userName.fill("supratikdeyece08@gmail.com");
    await password.fill("Learning@830$3mK2");
    await loginButton.click();
    /** 
     * Now everytime I can't write console.log (await cardTitles.first().textContent()); 
     * So to avoid this smartly I will use waitForLoadState and wait for networkidle, so that it will wait for the network to be idle and then it will execute the next line of code.
     */
    await page.waitForLoadState('networkidle');
    /**
     *  so in this below line it will store the cookies and local storage in the state.json file, so that we can use it in the next test case to add the product to the cart, so that we can verify the order details in the order history page.
     */
    await context.storageState({path: "state.json"});
    webContext = await browser.newContext({storageState: "state.json"});
})

test('Browser context validating Error login', async ({}) => { 

//    const context = await browser.newContext();
//    const page = await context.newPage();

     const page = await webContext.newPage();
    const email = "supratikdeyece08@gmail.com";
    const products = page.locator(".card-body");  
    // const userName = page.locator('#userEmail');
    // const password = page.locator('#userPassword');
    // const loginButton = page.locator("#login");
    const cardTitles = page.locator('.card-body  b');
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    // await userName.fill("supratikdeyece08@gmail.com");
    // await password.fill("Learning@830$3mK2");
    // await loginButton.click();
    /** 
     * Now everytime I can't write console.log (await cardTitles.first().textContent()); 
     * So to avoid this smartly I will use waitForLoadState and wait for networkidle, so that it will wait for the network to be idle and then it will execute the next line of code.
     */
    // // await page.waitForLoadState('networkidle');
    // /**
   
    // // await page.cardTitles.nth(1).waitFor();
    
    // // console.log (await cardTitles.first().textContent());

    const allTitles =await cardTitles.allTextContents();
    console.log(allTitles);

    /**
     * ZARA COAT 3
     */
    
    const productCount = await products.count();
    for(let i=0; i<productCount; i++){
        if(await products.nth(i).locator("b").textContent() === "ZARA COAT 3"){
            await products.nth(i).locator("text= Add To Cart").click();
            
        }  }                 

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    /**
     * Find locator based on tags and text, here I am finding the locator based on h3 tag and text ZARA COAT 3, if it is visible then it will return true otherwise false.      
     */
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    const boolPresent = await page.locator("text=Credit Card Number").isVisible();
    expect(boolPresent).toBeTruthy();
     
    await page.locator("[placeholder*='Country']").pressSequentially("Aus");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const countryOptions = await   dropdown.locator("button").count();
    for(let i=0; i<countryOptions; i++){
        const text = await dropdown.locator("button").nth(i).textContent();  
        if(text.trim() === "Australia"){
            await dropdown.locator("button").nth(i).click();
            break;
        } 
    }

    await expect (page.locator(".user__name [type='text']").first().textContent()).toHaveText("supratikdeyece08@gmail.com");
    await page.locator(".action__submit ").click();
    await expect(await page.locator(".hero-primary").textContent()).first().toBe(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    const rowCount = await rows.count();
    for(let i=0; i<rowCount; i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent();   
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    
    
    await page.pause();

})

test.only('Browser context validating login', async ({}) => { 

    const email = "";
    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const products = page.locator(".card-body");  
    const cardTitles = page.locator('.card-body  b').allTextContents();
    console.log(cardTitles);
}
);

