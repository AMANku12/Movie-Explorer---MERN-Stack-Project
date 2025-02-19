import React, { useCallback } from 'react'
import { Link } from 'react-router-dom';
import './Action.css';

const Adventure = ({ratedMovies, searchedMovie, setSearchedMovie}) => {
  const adventureMovies = ratedMovies.filter(movie => 
    movie.Genre.toLowerCase().includes('adventure')
  );

  const handleTitleClick = useCallback((movie) => {
    setSearchedMovie(movie);
  }, [setSearchedMovie]);

  return (
    <div className="movies-container">
      <h1>Adventure Movies</h1>
      <ul className="movies-list">
        {adventureMovies.map((movie) => (
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

export default Adventure;
