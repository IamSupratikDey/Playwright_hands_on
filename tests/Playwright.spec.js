const{test, expect} = require('@playwright/test')

test('File Upload and Reader Application', async(page)=>{

    /**
     * This is the sample file upload test case. It will upload a sample text file and read the content of the file and display it in the console.
     */
     await page.setInputFiles('input[type="file"]', path.join(__dirName, '..', 'sample','sample.txt'));
    
    /**
     * Verify file info is shown in the UI (filename and size)
     */

    await page.expect(page.getByText('sample.txt')).toBeVisible();
    
    /**
     * Verify the success message is shown in the UI
     */
    await page.expect(page.getByText('File uploaded successfully')).toBeVisible();
});

test('Should publish the file content and verify in the console', async({page})=>{
    await page.setInputFiles('input[type="file"]', path.join(__dirname, '..', 'sample','sample.txt'));


const publishBtn = page.getByRole('button', {name: 'Publish'});
publishBtn.click();

await expect(page.expect(page.getByRole('button', {name: 'publishing...'}))).toBeVisible();
await expect(page.expect(page.getByRole('button', {name: 'Publishing...}'}))).toBeVisible();
})

test('Test should publish the file', async({page})=>{

    const publishButton = page.getByRole('button',{name: /publish/i});
    await expect(publishButton).toBeVisible();
    await publishButton.click();
    await expect(publishBtn).toHaveText('Publishing...');
  await expect(publishBtn).toBeDisabled();

  // Success message appears
  await expect(page.getByText('File published successfully!')).toBeVisible();

  // UI resets: file info and content sections become hidden
  await expect(page.getByText('sample_file.txt')).toBeHidden();
  await expect(page.getByText(/sample file/i)).toBeHidden();
})