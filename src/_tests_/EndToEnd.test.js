import React from 'react';
import puppeteer from 'puppeteer';


describe('show/hide event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 300,
            timeout: 0
        })
        page = await browser.newPage();
        await page.goto('http://localhost:5173/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });
    test('An event element is collapsed by default', async () => {

        const eventDetails = await page.$('.eventDetails');
        expect(eventDetails).toBeNull();

    })
    test('User can expand an event to see its details', async () => {

        await page.click('.details-btn');

        const eventDetails = await page.$('eventDetails');
        expect(eventDetails).toBeDefined();

    });
    test('User can collapse an event to hide details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .eventDetails');
        expect(eventDetails).toBeNull();
    });
});

// describe('filter events by city', () => {
//     let browser;
//     let page;
    
//     beforeAll(async () => {
//         browser = await puppeteer.launch({
//             headless: false,
//             slowMo: 300,
//             timeout: 0
//         })
//         page = await browser.newPage();
//         await page.goto('http://localhost:5173/');
//         await page.waitForSelector('.event');
//     });
//     afterAll(() => {
//         browser.close();
//     })

//     test('Users see events from all cities by default', async () => {
//         const eventList = await page.$('#event-list')
//         const eventListItems = await eventList.$$('.event')
//         const eventLocations = eventListItems.map(event => event.$eval('.event', el => el.location))
//         expect(eventLocations).toContain('Berlin, Germany', 'London, England', 'New York, NY')
//     })
    
//     // test('User writes in the name of a city in a text box', async () => { })
//     // test('Users selects from a list of suggested cities', async () => {
//     // })
//     // test('Event list filters the new suggestion', async () => {
//     // })
// })
