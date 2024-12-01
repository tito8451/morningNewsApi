var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get('/articles', (req, res) => {
    fetch(`https://newsapi.org/v2/everything?sources=techcrunch&apiKey=${NEWS_API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'ok') {
                res.json({ articles: data.articles });
            } else {
                res.json({ articles: [] });
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des articles:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des articles' });
        });
});

module.exports = router;
