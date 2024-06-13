const express = require('express');
const fetch = require('node-fetch');
const app = express();
const dotenv = require('dotenv');

// Загрузка переменных окружения из файла .env
dotenv.config();

const apiKey = process.env.TMDB_API_KEY;

app.get('/api/movies', async (req, res) => {
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=ru-RU&page=1`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
