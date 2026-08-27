const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);
    await page.goto('https://test.fieldforceconnect.com/', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 4000));
    await page.type('input[name="username"]', 'anandtayade2004@gmail.com');
    await page.type('input[name="password"]', 'Pass@1234');
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 6000));

    // Open accordion
    const acc = await page.$('a[href="/"]');
    await acc.click();
    await new Promise(r => setTimeout(r, 2000));

    // Click /customers
    const cl = await page.$('a[href="/customers"]');
    await cl.click();
    await new Promise(r => setTimeout(r, 5000));

    // Save
    fs.writeFileSync('customer_page_real.html', await page.content());

    // Look for form buttons
    const btns = await page.$$eval('button, a', els => els.map(e => ({ text: e.innerText, href: e.href || '' })));
    console.log("Found interactive text:");
    btns.forEach(b => {
        if (b.text && b.text.trim().length > 0) {
            console.log(b.text.replace(/\s+/g, ' ').substring(0, 50));
        }
    });

    await browser.close();
})();
