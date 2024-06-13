const apiKey = 'bf74b3d60ea7bf435b3e310ef2e3a405'; 
const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=ru-RU&page=1`; // URL для запроса списка самых рейтинговых фильмов
const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=ru-RU`; // URL для запроса списка жанров фильмов

let movies = []; // Объявление переменной для хранения списка фильмов
let genres = {}; // Объявление объекта для хранения жанров фильмов

// Асинхронная функция для получения списка жанров фильмов
async function getGenres() {
    const response = await fetch(genresUrl);
    const data = await response.json();
    // Преобразование массива жанров в объект, где ключами являются ID жанров, а значениями - названия жанров
    genres = data.genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
    }, {});
    return genres;
}

// Асинхронная функция для получения списка самых рейтинговых фильмов
async function getMovies() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    movies = data.results;
    return movies;
}

// Асинхронная функция для получения трейлера для конкретного фильма
async function fetchTrailer(movieId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=ru-RU`);
    const videoData = await response.json(); // Парсинг ответа в формате JSON
    return videoData.results.find(video => video.type === 'Trailer'); // Возвращаем первый найденный трейлер (видео с типом 'Trailer')
}
