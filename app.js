const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';
// select the element - main, form, search, empty
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const empty = document.querySelector(".empty");

// fetch movie from API
const getMovies = async (url) => {
    empty.style.display = "none";
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    if (data.results.length > 0) {
        displayMovies(data.results);
    } else {
        empty.style.display = "block";
        main.innerHTML = "";
    }
};

getMovies(API_URL);

function displayMovies(movies) {
    main.innerHTML = ``
    movies.forEach((movie) => {
        const { title, overview, vote_average, poster_path } = movie

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img src = "${IMG_PATH + poster_path}" alt = ${title}>
            <div class = "movie-info">
                <h3> ${title} </h3>
                <span class = "${checkRatings(vote_average)}"> ${vote_average} </span>
            </div>
            <div class ="overview">
               <h3>overwiew</h3>
               ${overview}
            </div>        
        `;
        main.appendChild(movieEl);
    });
}

function checkRatings(rate) {
    // rate >= 8 green, >= 5.5 orange, red
    if (rate >= 8) {
        return "green";
    } else if (rate >= 5.5) {
        return "orange";
    } else {
        return "red";
    }
};

// search movies
const hiddenSearch = document.querySelector(".hidden-search") 
const span = document.querySelector(".hidden-search span")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchValue = search.value.trim();
    console.log(searchValue);
    if (searchValue) {
       span.textContent = searchValue;
       hiddenSearch.style.display = "block";

       getMovies(SEARCH_API + searchValue);
       search.value = "";
    } else {
        window.location.reload()
    } 
}); 