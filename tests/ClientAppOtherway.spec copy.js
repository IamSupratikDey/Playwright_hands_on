const {test, expect} = require('@playwright/test');

test.only('Browser context validating Error login', async ({browser}) => { 

   const context = await browser.newContext();
    const page = await context.newPage();
    const email = "supratikdeyece08@gmail.com";
    const products = page.locator(".card-body");  
    const userName = page.getByPlaceholder('email@example.com');
    const password = page.getByPlaceholder('enter your passsword');
    const loginButton = page.getByRole('button', { name: 'Login' });
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
     * If the above line is not working then I will use the below line of code to wait for the first card title to be visible, so that it will wait for the first card title to be visible and then it will execute the next line of code.
     */
    // await page.cardTitles.nth(1).waitFor();
    
    // console.log (await cardTitles.first().textContent());

    const allTitles =await cardTitles.allTextContents();
    console.log(allTitles);

    /**
     * ZARA COAT 3
     */
    
    // const productCount = await products.count();
    // for(let i=0; i<productCount; i++){
    //     if(await products.nth(i).locator("b").textContent() === "ZARA COAT 3"){
    //         await products.nth(i).locator("text= Add To Cart").click();
            
    //     }  }   
    
    /**
     * Here I am using the above code in a more smart way, I am using the filter method to filter the products based on the text ZARA COAT 3 and then I am clicking on the Add To Cart button, this is a more smart way to do the same thing as above.
     */

    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button", {name: "Add To Cart"}).click();

    // await page.locator("[routerlink*='cart']").click();
    // 

    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();

    await page.locator("div li").first().waitFor();
    /**
     * Find locator based on tags and text, here I am finding the locator based on h3 tag and text ZARA COAT 3, if it is visible then it will return true otherwise false.      
     */
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
     

    await page.getByRole("listitem").getByRole("button", {name: "Checkout"}).click();
    // await page.locator("text=Checkout").click();
    const boolPresent = await page.locator("text=Credit Card Number").isVisible();
    expect(boolPresent).toBeTruthy();
     
    await page.locator("[placeholder*='Country']").pressSequentially("Aus");
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
    await page.locator(".ta-results button").filter({hasText: "Australia"}).nth(1).click();
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
});