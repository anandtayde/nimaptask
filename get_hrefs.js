const h = require('fs').readFileSync('after_mycustomer_click.html', 'utf8');
const idx = h.indexOf('My Customers');
const chunk = h.substring(idx, idx + 1000);
const parts = chunk.split('href="');
for (let i = 1; i < Math.min(parts.length, 10); i++) {
    const url = parts[i].substring(0, parts[i].indexOf('"'));
    console.log(url);
}
