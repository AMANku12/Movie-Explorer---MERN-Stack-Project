import React, { useEffect, useState, useCallback } from 'react';
import "./Action.css";
import axios from 'axios';
import { Link } from 'react-router-dom';




const MyWatchlist = ({user, searchedmovie, setSearchedMovie}) => {

    const [watchlist, setWatchlist] = useState([]);

    useEffect(()=> {
        const fetchwatchlist = async()=>{
            const token = localStorage.getItem("token");
            try {
                const {data} = await axios.get("http://localhost:3001/api/mywatchlist",{
                    headers: {Authorization: `Bearer ${token}`},
                },user);
                console.log(data);
                setWatchlist(data);
                
            } catch (error) {
                setWatchlist([]);
            }
        }
        fetchwatchlist();
    },[]);

    const handletitleClick = useCallback((movie) => {
      setSearchedMovie(movie);
    }, [setSearchedMovie]);

    return (
      <div className="movies-container">
        <h1>My Watchlist</h1>
        {user ?
        (<ul className="movies-list">
          {watchlist ? (watchlist.map((movie) => (
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
            
          )))
          : (<li>Nothing in your watchlist</li>)
        }  </ul>
        ): (<li>Please login to view your watchlist</li>)}
        
      </div>
    )
}

export default MyWatchlist;
