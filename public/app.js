const API_KEY = 'cbbc13791a3d488b4bc79a4c473a5fa2';
const BASE_URL = 'https://api.themoviedb.org/3';

const ratedMovies = new Array(); //Has to be changed to a database, but this is just for testing

const counter = 0;

function buttonPressed(color){
  getMovie();
}

async function getMovie() {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1
      }
    });

    const movies = response.data.results;
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = '';

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];

    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie-item');

    const posterImg = document.createElement('img');
    posterImg.src = `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`;
    posterImg.alt = randomMovie.title;
    posterImg.width = 300;

    const title = document.createElement('p');
    title.textContent = `Title: ${randomMovie.title}`;

    const thumbsContainer = document.createElement('div');
    thumbsContainer.style.display = 'flex';
    thumbsContainer.style.justifyContent = 'center';
    thumbsContainer.style.gap = '10px';
    thumbsContainer.style.marginTop = '10px';

    const thumbsUpButton = document.createElement('button');
    thumbsUpButton.innerHTML = '👍';
    thumbsUpButton.style.backgroundColor = 'green';
    thumbsUpButton.style.border = 'none';
    thumbsUpButton.style.color = 'white';
    thumbsUpButton.style.padding = '10px';
    thumbsUpButton.style.fontSize = '18px';
    thumbsUpButton.style.cursor = 'pointer';
    thumbsUpButton.onclick = () => buttonPressed('Green');

    const thumbsDownButton = document.createElement('button');
    thumbsDownButton.innerHTML = '👎';
    thumbsDownButton.style.backgroundColor = 'red';
    thumbsDownButton.style.border = 'none';
    thumbsDownButton.style.color = 'white';
    thumbsDownButton.style.padding = '10px';
    thumbsDownButton.style.fontSize = '18px';
    thumbsDownButton.style.cursor = 'pointer';
    thumbsDownButton.onclick = () => buttonPressed('Red');

    thumbsContainer.appendChild(thumbsUpButton);
    thumbsContainer.appendChild(thumbsDownButton);

    movieDiv.appendChild(posterImg);
    movieDiv.appendChild(title);
    movieDiv.appendChild(thumbsContainer);
    
    movieContainer.appendChild(movieDiv);

  } catch (error) {
    console.error('Error fetching popular movies:', error.message);
  }
}

getMovie();