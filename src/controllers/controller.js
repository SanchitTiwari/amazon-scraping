require('dotenv').config();
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { MongoClient } = require('mongodb');
const uri  = process.env.MONGODB_URL;
const client = new MongoClient(uri);

const amazonMobiles = async () => {
    try {
        const url = 'https://www.amazon.in/s?k=mobile&crid=3QO6LLXJSE2BV&sprefix=mobile%2Caps%2C220&ref=nb_sb_noss_1';
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const mobiles = [];
        console.log($);
    $('div.s-main-slot.s-result-list.s-search-results.sg-row').each((index, element) => {
                  const mobile = $(element)
                  const title = mobile.find('span.a-size-medium.a-color-base.a-text-normal').text().split('|');
                  const price = mobile.find('span.a-price > span.a-offscreen').text()
                  const stars = mobile.find('div.a-section.a-spacing-none.a-spacing-top-micro > div > span').attr('aria-label')
                  const reviews = mobile.find('div.a-section.a-spacing-none.a-spacing-top-micro > div.a-row.a-size-small').children('span').last().attr('aria-label')
                  const information = {
                    productName : title,
                    productPrice: price,
                    productRating: stars,
                    productReviews:reviews
                }
                  mobiles.push(information);
              });
              
              const db = client.db('AMAZON');
              const collection = db.collection('mobiles');
              await collection.insertMany(mobiles);
              console.log('Mobiles data inserted into MongoDB');

    }
         catch (error) {
        console.error(error);
    }
};

const amazonSports = async () => {
    try {
        const url = 'https://www.amazon.in/s?k=sports&crid=1F71WM0RA2SXF&sprefix=sports%2Caps%2C236&ref=nb_sb_noss_1';
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const sports = [];

    $('div.s-main-slot.s-result-list.s-search-results.sg-row').each((index, element) => {
                  const sport = $(element)
                  const title = sport.find('span.a-size-base-plus.a-color-base.a-text-normal').text()
                  const price = sport.find('.a-price.a-price-whole').text()
                  const stars = sport.find('div.a-section.a-spacing-none.a-spacing-top-micro > div > span').attr('aria-label')
                  const reviews = sport.find('div.a-section.a-spacing-none.a-spacing-top-micro > div.a-row.a-size-small').children('span').last().attr('aria-label')
                  const information = {
                    productName : title,
                    productPrice: price,
                    productRating: stars,
                    productReviews:reviews
                }
                  sports.push(information);
                 });
        console.log(sports);
        const db = client.db('AMAZON');
        const collection = db.collection('sports');
        await collection.insertMany(sports);
        console.log('Sports data inserted into MongoDB');
 }
         catch (error) {
        console.error(error);
    }
};


const amazonStudy = async () => {
    try {
        const url = 'https://www.amazon.in/s?k=study&crid=ENTG0LQP49W3&sprefix=study%2Caps%2C237&ref=nb_sb_noss_2';
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const studies = [];

        $('div.s-main-slot.s-result-list.s-search-results.sg-row').each((index, element) => {
            const study = $(element);
            const title = study.find('span.a-size-base-plus.a-color-base.a-text-normal').text();
            const price = study.find('span.a-price > span.a-offscreen').text();
            const stars = study.find('div.a-section.a-spacing-none.a-spacing-top-micro > div > span').attr('aria-label');
            const reviews = study.find('div.a-section.a-spacing-none.a-spacing-top-micro > div.a-row.a-size-small').children('span').last().attr('aria-label');

            const information = {
                productName: title,
                productPrice: price,
                productRating: stars,
                productReviews: reviews
            };

            studies.push(information);
            console.log('Product:', information);
        });

        const db = client.db('AMAZON');
        const collection = db.collection('studies');
        await collection.insertMany(studies);
        console.log('Studies data inserted into MongoDB');
    } catch (error) {
        console.error('Error while scraping Amazon study page:', error);
    }
};


module.exports = {amazonMobiles,amazonSports,amazonStudy};


