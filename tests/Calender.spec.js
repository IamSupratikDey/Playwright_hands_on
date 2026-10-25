  const {test, expect} = require('@playwright/test');

test.only('Calender validations', async ({page}) => {  
    

    const monthnumber = 6;
    const year = 2027;
    const date = 15;
    const expectedList = [monthnumber, year, date];
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator(".react-date-picker__inputGroup__month").click();
    await page.locator(".react-date-picker__inputGroup__label").click();
    await page.locator(".react-date-picker__inputGroup__label").click();
    await page.getByText('year').click();
    await page.locator(".react-calendar__decade-view__years__year").nth(Number(monthnumber-1)).click();
    await page.locator("//abbr[text()='"+year+"']").click();
    
    const input = page.locator(".react-date-picker__inputGroup");

    for(let i=0; i<expectedList.length; i++){
        const text = await input.nth(i).inputValue();
        expect(text).toBe(expectedList[i].toString());
    }
    
});