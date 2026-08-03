const {test, expect, request} = require('@playwright/test');
require('../tests/Utils/ApiUtils');
const {ApiUtils} = require('../tests/Utils/ApiUtils');


const  loginPayload = {userEmail: "supratikdeyece08@gmail.com", userPassword: "Learning@830$3mK2"};
const orderPayload = {
            "orders": [{
                "country": "India",
                "productOrderedId": "6960eac0c941646b7a8b3e68"
            }]
        }
let token;
let orderId;
let response;


test.beforeAll( async ()=>
{
    
    /**
     * This is a login API call, here I am making a login API call to get the token, so that I can use the token in the next test case to add the product to the cart.
     */
    const  apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
//   const loginresponse =  await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
//         {

//         data: 
//             loginPayload 
            
//         })
    
//     expect(loginresponse.ok()).toBeTruthy();

//     /**
//      * grab the JSON response body and store it in a variable, so that we can use it in the next test case, here I am storing the token in a variable, so that I can use it in the next test case to add the product to the cart.
//      */
//     const loginResponseJson = await loginresponse.json();
//     token = loginResponseJson.token;
//     console.log(token);


   
});

// test.beforeEach( ()=>
// {
   
// }) ;



test.only('Api testing using playwright', async ({browser}) => { 

    
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    const context = await browser.newContext();
    const page = await context.newPage();
    const orderID = await apiUtils.createOrder(orderPayload);

    /**
     * Here I am adding the token to the local storage, 
     * so that I can use the token in the next test case to add the product to the cart, 
     * here I am using addInitScript to add the token to the local storage, 
     * so that it will be available for all the pages in the browser context.
     * 
     * Here token has no life and we will be calling it from ApiUtils class, so that it will return the token and then 
     * we can use that token to add the product to the cart, so that we can verify the order details in the order history 
     * page.
     * 
     */
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);
    const email = "supratikdeyece08@gmail.com";
    const products = page.locator(".card-body");  
    const userName = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginButton = page.locator("#login");
    const cardTitles = page.locator('.card-body  b');
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    // await userName.fill("supratikdeyece08@gmail.com");
    // await password.fill("Learning@830$3mK2");
    // await loginButton.click();
    /** 
     * Now everytime I can't write console.log (await cardTitles.first().textContent()); 
     * So to avoid this smartly I will use waitForLoadState and wait for networkidle, so that it will wait for the network to be idle and then it will execute the next line of code.
     */
    // await page.waitForLoadState('networkidle');
    // /**
    //  * If the above line is not working then I will use the below line of code to wait for the first card title to be visible, so that it will wait for the first card title to be visible and then it will execute the next line of code.
    //  */
    // // await page.cardTitles.nth(1).waitFor();
    
    // // console.log (await cardTitles.first().textContent());

    // const allTitles =await cardTitles.allTextContents();
    // console.log(allTitles);

    // /**
    //  * ZARA COAT 3
    //  */
    
    // const productCount = await products.count();
    // for(let i=0; i<productCount; i++){
    //     if(await products.nth(i).locator("b").textContent() === "ZARA COAT 3"){
    //         await products.nth(i).locator("text= Add To Cart").click();
            
    //     }  }                 

    // await page.locator("[routerlink*='cart']").click();
    // await page.locator("div li").first().waitFor();
    // /**
    //  * Find locator based on tags and text, here I am finding the locator based on h3 tag and text ZARA COAT 3, if it is visible then it will return true otherwise false.      
    //  */
    // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    // expect(bool).toBeTruthy();

    // await page.locator("text=Checkout").click();
    // const boolPresent = await page.locator("text=Credit Card Number").isVisible();
    // expect(boolPresent).toBeTruthy();
     
    // await page.locator("[placeholder*='Country']").pressSequentially("Aus");
    // const dropdown = page.locator(".ta-results");
    // await dropdown.waitFor();
    // const countryOptions = await   dropdown.locator("button").count();
    // for(let i=0; i<countryOptions; i++){
    //     const text = await dropdown.locator("button").nth(i).textContent();  
    //     if(text.trim() === "Australia"){
    //         await dropdown.locator("button").nth(i).click();
    //         break;
    //     } 
    // }

    // await expect (page.locator(".user__name [type='text']").first().textContent()).toHaveText("supratikdeyece08@gmail.com");
    // await page.locator(".action__submit ").click();
    // await expect(await page.locator(".hero-primary").textContent()).first().toBe(" Thankyou for the order. ");
//    orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//     console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    const rowCount = await rows.count();
    for(let i=0; i<rowCount; i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent();   
        if(response.orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

    
    
    await page.pause();
});
/**
 * Verify the order details in the order history page, here I am verifying the order details in the order history page, if the order details are correct then it will return true otherwise false.
 * 
 * 1. Click on the my orders button    
 * 2. Wait for the order history page to load
 * 3. Get the order id from the order history page
 * 4. Click on the view button of the order id      
 * 5. Verify the order id in the order details page, if the order id is correct then it will return true otherwise false.
 * */

