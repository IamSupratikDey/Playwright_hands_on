// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  timeout : 100 * 1000, // for denbugging purpose I have increased the timeout to 100 seconds, so that I can 
  // debug the test cases without any timeout issues, but in real time we should keep the timeout to 30 seconds
  //  or less than that, so that we can catch the issues faster and we can fix them faster.

  expect: {
    timeout: 5 * 1000,
    
  },
   reporter: 'html',

  use: {
   
     browserName: 'chromium',
     headless: true,
     screenshot: 'on',
     trace: 'on'

     
},

 
});

