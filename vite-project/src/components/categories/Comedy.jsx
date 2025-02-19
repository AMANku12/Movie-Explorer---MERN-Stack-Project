import React from 'react';
import { Link } from 'react-router-dom';
import "./Action.css";

const Comedy = ({ratedMovies, searchedMovie, setSearchedMovie}) => {
  const comedyMovies = ratedMovies.filter(movie => 
    movie.Genre.toLowerCase().includes('comedy')
  );

  const handleTitleClick = (movie) => {
    setSearchedMovie(movie);
  };

  return (
    <div className="movies-container">
      <h1>Comedy Movies</h1>
      <ul className="movies-list">
        {comedyMovies.map((movie) => (
          <li key={movie.imdbID} className="movie-item">
            <Link 
              to="/searchedMovie" 
              onClick={() => handleTitleClick(movie)}
              className="movie-link"
            >
              <div className="movie-item-inner">
                <h3 className="movie-title">{movie.Title}</h3>
                <div className="movie-poster-container">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="movie-poster"
                  />
                </div>
                <div className="movie-info">
                  <div className="movie-details">
                    <span className="movie-year">{movie.Year}</span>
                    <span className="movie-rating">⭐ {movie.imdbRating}</span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comedy;
