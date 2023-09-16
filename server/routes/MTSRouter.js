const express = require('express');
const MTSRouter = express.Router();
const axios = require('axios');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs').promises;

MTSRouter.get('/parse-and-save-tariffs', async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        const url =
            'https://moskva.mts.ru/personal/mobilnaya-svyaz/tarifi/vse-tarifi/mobile-tv-inet';
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('.card.card__wrapper');

        // динамические данных
        const dynamicData = await page.evaluate(() => {
            const featuresList = [];
            document
                .querySelectorAll('.card.card__wrapper')
                .forEach((element) => {
                    const features = [];
                    element
                        .querySelectorAll(
                            '.features.features__margin.features__padding li'
                        )
                        .forEach((featureElement) => {
                            const featureText =
                                featureElement.textContent.trim();
                            features.push(featureText);
                        });
                    featuresList.push(features);
                });
            return featuresList;
        });

        await browser.close();

        // использую полученные данные в Cheerio
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const tariffs = [];

        // извлекаем контент
        $('.card.card__wrapper').each((index, element) => {
            const features = dynamicData[index]; // Используем данные из Puppeteer
            const tariffData = {
                title: $(element).find('.card-title').text().trim(),
                description: $(element).find('.card-description').text().trim(),
                benefitsDescription: $(element)
                    .find('.card-benefits__margin .benefits-description')
                    .text()
                    .trim(),
                price: $(element).find('.price-main .price-text').text().trim(),
                features: features,
            };
            tariffs.push(tariffData);
        });

        await fs.writeFile('tariffs.json', JSON.stringify(tariffs, null, 2));
        console.log(tariffs);
        res.json(tariffs);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Произошла ошибка при парсинге тарифов',
        });
    }
});

MTSRouter.get('/get-tariffs', async (req, res) => {
    try {
        const data = await fs.readFile('tariffs.json', 'utf-8');
        const tariffs = JSON.parse(data);
        res.json(tariffs);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Произошла ошибка при получении данных из JSON-файла',
        });
    }
});

MTSRouter.get('/update-and-get-tariffs', async (req, res) => {
    try {
        const url =
            'https://moskva.mts.ru/personal/mobilnaya-svyaz/tarifi/vse-tarifi/mobile-tv-inet';

        const response = await axios.get(url);
        const html = response.data;

        const $ = cheerio.load(html);
        const tariffs = [];

        $('.card.card__wrapper').each((index, element) => {
            const features = [];
            $(element)
                .find('.features.features__margin.features__padding li')
                .each((featureIndex, featureElement) => {
                    const featureText = $(featureElement).text().trim();
                    features.push(featureText);
                });

            const tariffData = {
                title: $(element).find('.card-title').text().trim(),
                description: $(element).find('.card-description').text().trim(),
                benefitsDescription: $(element)
                    .find('.card-benefits__margin .benefits-description')
                    .text()
                    .trim(),
                price: $(element).find('.price-main .price-text').text().trim(),
                features: features,
            };
            tariffs.push(tariffData);
        });

        await fs.writeFile('tariffs.json', JSON.stringify(tariffs, null, 2));
        console.log(tariffs);

        res.json(tariffs);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Произошла ошибка при парсинге тарифов',
        });
    }
});

module.exports = MTSRouter;
