const Nigtmare = require('nightmare')

var article = process.argv.slice(2).join('');

let options = {
    show: true,
}

const nightmare = Nigtmare(options);

nightmare
    .goto('https://www.nike.com/gb/en_gb/')
    .wait('[id="search"]')
    .wait(1000)
    .type('[id="search"]', article + '\u000d')
    .wait('[class="grid-item-content"]')
    .wait(1000)
    .click('[class="grid-item-content"]')
    .wait('[class="text-color-black"]')
    .wait(1000)
    .evaluate(() => {
        let price = document.querySelector('[data-test="product-price"]').innerText;
        let name = document.querySelector('[data-test="product-title"]').innerText;
        let image = document.querySelectorAll('picture')[1].querySelector('img').src;

        return {
            price: price,
            name: name,
            image: image,
        }
    })
    .end()
    .then(result => {
        console.log(article + '\nName: ' + result.name + '\nPrice: ' + result.price + '\nImage: ' + result.image);
    })
    .catch(error => {
        console.log(error);
    })