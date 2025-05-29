require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors())

const API_KEY = process.env.API_FOOTBALL_KEY;
const API_HOST = process.env.API_FOOTBALL_HOST || 'v3.football.api-sports.io';
const BASE_URL = process.env.API_FOOTBALL_URL || 'https://v3.football.api-sports.io';

if (!API_KEY) {
    console.error('API_FOOTBALL_KEY environment variable is required');
    process.exit(1);
}

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'x-apisports-key': API_KEY,
        'x-rapidapi-host': API_HOST
    }
});

let lastRequestTime = 0;
const REQUEST_INTERVAL = 1000; 

app.use(async (req, res, next) => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < REQUEST_INTERVAL) {
        const waitTime = REQUEST_INTERVAL - timeSinceLastRequest;
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    lastRequestTime = Date.now();
    next();
});

// Routes
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy', 
        timestamp: new Date(),
        api: 'API-Football Free Tier'
    });
});

app.get('/api/matches', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        
        const response = await apiClient.get('/fixtures', {
            params: {
                date: today,
                timezone: 'Europe/London' 
            }
        });

        const matches = response.data.response.map(match => ({
            id: match.fixture.id,
            league: match.league.name,
            leagueId: match.league.id,
            round: match.league.round,
            status: match.fixture.status.short,
            homeTeam: match.teams.home.name,
            awayTeam: match.teams.away.name,
            homeGoals: match.goals.home,
            awayGoals: match.goals.away,
            timestamp: match.fixture.timestamp
        }));

        res.json({
            success: true,
            count: matches.length,
            data: matches
        });
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch matches',
            error: error.response?.data?.errors || error.message
        });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Server error',
        error: err.message
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Using API-Football free tier at ${BASE_URL}`);
});