class ApiUtils {
    
    
    
    
    constructor(apiContext, loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    
    
    async getToken(){

        let token;
      
        const loginresponse =  await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
                {
        
                data: 
                    this.loginPayload 
                    
                })
            
            // expect(loginresponse.ok()).toBeTruthy();
        
            /**
             * grab the JSON response body and store it in a variable, so that we can use it in the next test case, here I am storing the token in a variable, so that I can use it in the next test case to add the product to the cart.
             */
            const loginResponseJson = await loginresponse.json();
            token = loginResponseJson.token;
            console.log(token);
              return token;
    }

    async createOrder(orderPayload)
    {   
        const response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    Authorization: response.token,
                    "Content-Type": "application/json",
                }
            }
            );
        
            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
        
            const orderId = orderResponseJson.orders[0];
            console.log(orderId);
            response.orderId = orderId;
            return response;
        
    }
}

/**
 * This file is n ow globally available to all the test files, so that we can use the functions defined in this file 
 * in any test file, we just need to import this file in the test file and then we can use the functions defined in this file.
 */
module.exports = {ApiUtils};