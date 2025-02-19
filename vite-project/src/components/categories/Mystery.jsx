import { set } from 'lodash';
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom';
import './Action.css';


const Mystery = ({ratedMovies, searchedMovie, setSearchedMovie}) => {
  const mysteryMovies = ratedMovies.filter(movie => 
    movie.Genre.toLowerCase().includes('mystery')
  );

  const handletitleClick = useCallback((movie) => {
    setSearchedMovie(movie);
  }, [setSearchedMovie]);

  return (
    <div className="movies-container">
      <h1>Mystery Movies</h1>
      <ul className="movies-list">
        {mysteryMovies.map((movie) => (
          <li key={movie.imdbID} className="movie-item">
            <Link 
              to="/searchedMovie" 
              onClick={() => handletitleClick(movie)}
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
  )
}

export default Mystery
