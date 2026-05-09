// Incarc dotenv 
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/football-news', async (req, res) => {
    const teamName = req.query.team;
    
    // Extrag cheile
    const RAPID_KEY = process.env.RAPID_API_KEY;
    const NEWS_KEY = process.env.NEWS_API_KEY;

    try {
        // Serviciul Cloud 1: SportAPI7
        const footballRes = await axios.get(`https://sportapi7.p.rapidapi.com/api/v1/search/all`, {
            params: { q: teamName },
            headers: {
                'X-RapidAPI-Key': RAPID_KEY, // Cheie privată
                'X-RapidAPI-Host': 'sportapi7.p.rapidapi.com'
            }
        });

        const results = footballRes.data.results || [];
        const teamMatch = results.find(item => item.type === 'team') || results[0];

        if (!teamMatch) return res.status(404).json({ error: "Echipa nu a fost găsită." });

        // Serviciul Cloud 2: NewsAPI
        const newsRes = await axios.get(`https://newsapi.org/v2/everything`, {
            params: { 
                q: `+"${teamName}" +football`, 
                language: 'en', 
                sortBy: 'relevancy',
                pageSize: 5 
            },
            headers: { 'X-Api-Key': NEWS_KEY } // Cheie privată
        });

        res.json({
            team: teamMatch.entity || teamMatch,
            articles: newsRes.data.articles,
            performance: {
                rank: Math.floor(Math.random() * 5) + 1,
                form: ['W', 'W', 'D', 'W', 'L']
            }
        });

   } catch (error) {
    console.error("🚨 Detalii eroare:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Eroare de conexiune Cloud." });
}
});

app.listen(PORT, () => {
    console.log(`🚀 Server securizat pornit pe portul ${PORT}`);
});