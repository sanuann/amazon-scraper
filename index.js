const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

// const apiKey = 'bbc1bf85aa3f39fc3027df0a67aed3b6';
const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API');
});

// GET product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { apiKEy } = req.query;
    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});


// GET product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { apiKEy } = req.query;
    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// GET Search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { apiKEy } = req.query;
    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
