import React from 'react';
import puppeteer from 'puppeteer';


describe('show/hide event details', () => {
    test('An event element is collapsed by default', async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:5173/')

        await page.waitForSelector('.event');
        const eventDetails = await page.$('.event .details-btn');
        expect(eventDetails).toBeNull();
        await browser.close();
    })
});