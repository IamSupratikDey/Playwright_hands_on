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

const fakePayLoadOrders = {data:[], message: "No Orders"};
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
   
});

test('Place and order', async ({browser}) => {
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client/#/');

    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a078460965c23b43b1d4d66");
    let body = fakePayLoadOrders;
    route =>
    {
         //inytercepting response - Api response -> fakeresponse -> broswer
         const response = page.request.fetch(route.request()); //here we getting real response from the server
            route.fulfill({
                response,
                body,
            }); // here we are fulfilling the request with the real response from the server, 
            // but we can also modify the response and then fulfill the request with the modified response, 
            // so that we can test the UI with the modified response, but here I am fulfilling the request with 
            // the real response from the server, so that I can test the UI with the real response from the server.
    }
    await page.locator("[routerlink*='myorders']").click();
    /**
     * Here I am waiting for the response of the API call, so that I can verify the order details in the UI, 
     * if I don't wait for the response then it will throw an error because the order details will not be available 
     * in the UI, so it is always a good practice to wait for the response of the API call before verifying the 
     * order details in the UI.
     */
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await page.locator("mt-4").waitFor();
    const orderRows = page.locator("tbody tr");



});
