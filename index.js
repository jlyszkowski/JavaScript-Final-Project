const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const moviesGrid = document.getElementById("movies-grid");
const sortSelect = document.getElementById("sort-select");

const API_KEY = "f55edcb5";
let moviesArray = [];

async function fetchMovies(searchTerm) {
  const response = await fetch(
    `http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
  );
  const data = await response.json();

  if (data.Search) {
    moviesArray = data.Search;
    displayMovies(moviesArray);
  } else {
    moviesGrid.innerHTML = "<p>No movies found. Try another search!</p>";
  }
}

function displayMovies(movies) {
  moviesGrid.innerHTML = "";

  movies.forEach(function (movie) {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x400?text=No+Image";

    card.innerHTML = `
      <img src="${poster}" alt="${movie.Title}" />
      <div class="movie-card-info">
        <h3>${movie.Title}</h3>
        <p>Type: ${movie.Type}</p>
        <p class="year">${movie.Year}</p>
      </div>
    `;

    moviesGrid.appendChild(card);
  });
}

sortSelect.addEventListener("change", function () {
  const sortValue = sortSelect.value;
  let sortedMovies = [...moviesArray];

  if (sortValue === "az") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sortValue === "za") {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (sortValue === "newest") {
    sortedMovies.sort((a, b) => b.Year - a.Year);
  } else if (sortValue === "oldest") {
    sortedMovies.sort((a, b) => a.Year - b.Year);
  }

  displayMovies(sortedMovies);
});

searchBtn.addEventListener("click", function () {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    fetchMovies(searchTerm);
  }
});

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      fetchMovies(searchTerm);
    }
  }
});