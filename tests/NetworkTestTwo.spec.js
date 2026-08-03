const {test, expect} = require('@playwright/test');

test("Security test two", async ({page}) => {
   



    
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", 
        route => route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=123456789"}));
    await page.locator("button:has-text('View')").click();

})