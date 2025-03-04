import React from 'react';
import "./SearchedMovie.css"
import axios from 'axios';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchedMovie = ({ searchedMovie, loggedIn, user, setUser}) => {

  const [inwatchlist,setinwatchlist] = useState(false);

  if (searchedMovie) {
    console.log("from searchedmovie comp:- ",searchedMovie);
  } else {
    console.log("nothing in searched movie");
  }
  // console.log(loggedIn);

  useEffect(()=>{
    if(user && user.watchlist && searchedMovie){
      const exists = user.watchlist.some(movie => movie.imdbID === searchedMovie.imdbID );
      setinwatchlist(exists);
    }
  },[user,searchedMovie]);
  

  const handleAddtowatchlist = (searchedMovie)=>{
    axios.post("http://localhost:3001/api/addtowatchlist",{user,newmovie: searchedMovie})
    .then((res)=>{
      console.log(res.data);
      if(res.data.message==="Added to watchlist"){
        alert("Added to watchlist");
        setinwatchlist(true);
        setUser(res.data.user);
      }
    }).catch((error)=>{
      alert("Server error!!");
      console.log(error);
    })
  }

  return (
    <div className="movie-details-container">
      <Link to="/" className="back-button">
        ← Back to Movies
      </Link>
      {searchedMovie ? (
      <div className="movie-details-card">
        <div className="poster-section">
          <img src={searchedMovie.Poster} alt={searchedMovie.Title} />
        </div>
        
        <div className="content-section">
          <h1 className="movie-title">{searchedMovie.Title}</h1>
          <div className="movie-details">
            <span className="details">{searchedMovie.Year}</span>
            <span className="rating">⭐ {searchedMovie.imdbRating}</span>
          </div>
          <p className="plot">{searchedMovie.Plot}</p>
          
          <div className="movie-info-grid">
            <div className="info-item">
              <div className="info-label">Genre</div>
              <div className="info-value">{searchedMovie.Genre}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Director</div>
              <div className="info-value">{searchedMovie.Director}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Runtime</div>
              <div className="info-value">{searchedMovie.Runtime}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Released</div>
              <div className="info-value">{searchedMovie.Released}</div>
            </div>

            <div className="addtowatchlist">
              {
                loggedIn ? (
                inwatchlist ?(
                  <button>Remove from watchlist</button>
                ):(<button onClick={()=>handleAddtowatchlist(searchedMovie)}>Add to watchlist</button>))
                : (<button onClick={()=> alert("Login First!!")}>Add to watchlist</button>)
              }
            </div>
          </div>
        </div>
      </div>
      ) : (
        <div className="movie-details-card">
          <h1>No movie found</h1>
        </div>
      )}
    </div>
  );
};

export default SearchedMovie;
