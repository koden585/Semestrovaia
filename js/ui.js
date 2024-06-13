// Обработчик события для выполнения кода после загрузки DOM-дерева
document.addEventListener('DOMContentLoaded', () => {
    // Получаем элементы из DOM
   const moviesList = document.getElementById('movies-list');
   const genreFilter = document.getElementById('genre-filter');
   const dateFilter = document.getElementById('date-filter');
   let removedMovies = new Set();

   // Инициализация: получение жанров и фильмов, заполнение фильтров
   async function init() {
       await getGenres(); // Получение жанров
       populateGenreFilter(); // Заполнение фильтра жанров
       await getMovies(); // Получение фильмов
       displayMovies(movies); // Отображение фильмов
   }

   // Заполнение фильтра жанров
   function populateGenreFilter() {
       Object.keys(genres).forEach(id => {
           const option = document.createElement('option');
           option.value = id;
           option.textContent = genres[id];
           genreFilter.appendChild(option); // Добавление опции в фильтр жанров
       });
   }

   // Отображение фильмов на странице
   function displayMovies(filteredMovies) {
       moviesList.innerHTML = ''; // Очистка списка фильмов
       filteredMovies.forEach(movie => {
           if (removedMovies.has(movie.id)) {
               return; // Пропуск удалённых фильмов
           }
           const li = document.createElement('li');
           const column1 = document.createElement('div');
           column1.classList.add('movie-column');
           const column2 = document.createElement('div');
           column2.classList.add('movie-column');
           const column3 = document.createElement('div');
           column3.classList.add('movie-column');

           // Создание и добавление постера фильма
           const img = document.createElement('img');
           img.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
           img.alt = movie.title;

           // Создание и добавление информации о фильме
           const movieInfo = document.createElement('div');
           movieInfo.classList.add('movie-info');
           const title = document.createElement('p');
           title.classList.add('movie-title');
           title.textContent = movie.title;
           const date = document.createElement('p');
           date.classList.add('movie-date');
           date.textContent = `Дата выхода: ${movie.release_date}`;
           const genreNames = movie.genre_ids.map(id => genres[id]).join(', ');
           const genresElement = document.createElement('p');
           genresElement.classList.add('movie-genres');
           genresElement.textContent = `Жанры: ${genreNames}`;
           movieInfo.appendChild(title);
           movieInfo.appendChild(date);
           movieInfo.appendChild(genresElement);

           // Создание и добавление обзора фильма
           const overview = document.createElement('p');
           overview.classList.add('movie-overview');

           // Создание контейнера для трейлера
           overview.textContent = movie.overview;
           const trailerContainer = document.createElement('div');
           trailerContainer.classList.add('trailer-container');

            // Добавление элементов в соответствующие колонки
           column1.appendChild(img);
           column1.appendChild(movieInfo);
           column2.appendChild(overview);
           column3.appendChild(trailerContainer);
           li.appendChild(column1);
           li.appendChild(column2);
           li.appendChild(column3);

           // Создание и добавление кнопки удаления
           const deleteButton = document.createElement('button');
           deleteButton.classList.add('delete-button');
           deleteButton.textContent = '×';
           deleteButton.addEventListener('click', () => {
               removedMovies.add(movie.id); // Добавление фильма в список удалённых
               li.remove(); // Удаление элемента из DOM
           });
           li.appendChild(deleteButton);
           moviesList.appendChild(li); // Добавление фильма в список

           // Получение и отображение трейлера
           fetchTrailer(movie.id).then(trailer => {
               if (trailer) {
                   const iframe = document.createElement('iframe');
                   iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
                   trailerContainer.appendChild(iframe);
               } else {
                   const noTrailerMessage = document.createElement('p');
                   noTrailerMessage.classList.add('no-trailer-message');
                   noTrailerMessage.textContent = 'Трейлер не найден';
                   trailerContainer.appendChild(noTrailerMessage);
               }
           }).catch(error => {
               console.error('Ошибка при получении трейлера:', error);
           });
       });
   }

   // Фильтрация фильмов по жанру и дате
   function filterMovies() {
       const selectedGenre = genreFilter.value;
       const selectedDateRange = dateFilter.value;
       let filteredMovies = movies;
       if (selectedGenre) {
           filteredMovies = filteredMovies.filter(movie => movie.genre_ids.includes(parseInt(selectedGenre)));
       }
       if (selectedDateRange) {
           const [startYear, endYear] = selectedDateRange.split('-').map(Number);
           filteredMovies = filteredMovies.filter(movie => {
               const releaseYear = new Date(movie.release_date).getFullYear();
               return releaseYear >= startYear && releaseYear <= endYear;
           });
       }
       displayMovies(filteredMovies); // Отображение отфильтрованных фильмов
   }

   // Добавление обработчиков событий для фильтров
   genreFilter.addEventListener('change', filterMovies);
   dateFilter.addEventListener('change', filterMovies);

   init();
});

// Обработчик для кнопки "Enter"
function handleEnterKey(event) {
   if (event.keyCode === 13) {
       var nextButton = document.getElementById("nextButton");
       if (nextButton) {
           nextButton.click();
       }
   }
}

// Показ основного содержимого
function showMainContent() {
   var userName = document.getElementById("nameInput").value.trim();
   if (userName) {
       document.getElementById("welcomeContainer").style.display = "none";
       document.getElementById("mainContent").style.display = "block";
       document.getElementById("welcomeMessage").textContent = "Привет, " + userName + "!";
       document.getElementById("userNameHeader").textContent = userName;
       document.getElementById("nameField").value = userName;
   } else {
       alert("Пожалуйста, введите ваше имя!");
   }
}

// Валидация формы
function validateForm(event) {
   event.preventDefault();
   var consentCheckbox = document.getElementById("consentCheckbox");
   if (!consentCheckbox.checked) {
       alert("Вы должны согласиться с условиями перед отправкой формы.");
       return false;
   }
   alert("Форма успешно отправлена!");
   document.getElementById("userForm").reset();
   return false;
}

// Переключение темного режима
function toggleDarkMode() {
   const body = document.body;
   const themeToggleButton = document.getElementById('themeToggleButton');
   // Переключение класса "dark-mode" у элемента body
   body.classList.toggle('dark-mode');

   if (body.classList.contains('dark-mode')) {
       themeToggleButton.textContent = 'Светлая тема';
   } else {
       themeToggleButton.textContent = 'Темная тема';
   }
}

