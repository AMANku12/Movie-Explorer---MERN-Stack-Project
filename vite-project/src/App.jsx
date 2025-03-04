import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useHref } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopRated from './components/categories/TopRated';
import reactLogo from './assets/react.svg';
import SearchedMovie from './components/SearchedMovie';
import Action from './components/categories/Action';
import Scifi from './components/categories/Scifi';
import Trending from './components/categories/Trending';
import Adventure from './components/categories/Adventure';
import Horror from './components/categories/Horror';
import Comedy from './components/categories/Comedy';
import Mystery from './components/categories/Mystery';
import Login from './components/Login';
import Register from './components/Register';
import MyWatchlist from './components/categories/MyWatchlist';
import axios from 'axios';
import './App.css';

function CenterContent({ratedMovies, searchedMovie, setSearchedMovie, loggedIn, user, setUser }){
  const location = useLocation();

  return (
    <div className="center-content" >
      {location.pathname === "/top-rated" ? (
        <TopRated movies={ratedMovies} searchedMovie={searchedMovie} setSearchedMovie={setSearchedMovie} />
      ) 
      : location.pathname === "/searchedMovie" ? (
        <SearchedMovie searchedMovie={searchedMovie} loggedIn={loggedIn} user={user} setUser={setUser}/>
      ) 
      : location.pathname === "/action" ? (
        <Action ratedMovies={ratedMovies} searchedMovie={searchedMovie} setSearchedMovie={setSearchedMovie} />
      ) 
      : location.pathname === "/scifi" ? (
        <Scifi ratedMovies={ratedMovies} searchedMovie={searchedMovie} setSearchedMovie={setSearchedMovie} />
      ) 
      : location.pathname === "/horror" ? (
        <Horror ratedMovies={ratedMovies} searchedMovie={searchedMovie} setSearchedMovie={setSearchedMovie} />
      ) 
      : location.pathname === "/adventure" ? (
        <Adventure ratedMovies={ratedMovies} searchedMovie={searchedMovie} setSearchedMovie={setSearchedMovie} />
      ) 
      :location.pathname === "/comedy" ? (
        <Comedy ratedMovies={ratedMovies} searchedMovie={searchedMovie} setSearchedMovie={setSearchedMovie} />
      ) 
      : location.pathname === "/mystery" ? (
        <Mystery ratedMovies={ratedMovies} searchedMovie={searchedMovie} setSearchedMovie={setSearchedMovie} />
      ) 
      : location.pathname === "/trending" ? (
        <Trending ratedMovies={ratedMovies} searchedMovie={searchedMovie} setSearchedMovie={setSearchedMovie} />
      ) 
      : location.pathname === "/mywatchlist" ? (
        <MyWatchlist user={user} searchedmovie={searchedMovie} setSearchedMovie={setSearchedMovie}/>
      ) 
      :(
        <Trending ratedMovies={ratedMovies} searchedMovie={searchedMovie} setSearchedMovie={setSearchedMovie} />
      )}
    </div>
  )
}

function App() {
  let [ratedMovies, setratedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // State to store the selected movie
  const [searchedMovie, setSearchedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // to fetch data for rated movies
  // Corrected useEffect for ratedMovies
  useEffect(() => {
    axios.get("/api/movies")
      .then((response) => {
        // Check if the response data is an array or nested under 'results'
        const data = response.data.movies;
        console.log("Data fetched", data.slice(0,5));
         setratedMovies(data);
        console.log("Data fetched", data.slice(0,5));
      })
      .catch((error) => {
        console.log("Error in fetching rated movies", error);
      });
  }, []);


  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} setLoggedIn={setLoggedIn}/>} />
          <Route path="/register" element={<Register setUser={setUser} setLoggedIn={setLoggedIn}/>} />
          <Route path="/*" element={
            <div className="main-layout">
              <div className="left-content">
                <Navbar movies={ratedMovies} searchedMovie={searchedMovie} setSearchedMovie={setSearchedMovie} />
              </div>
              <div className="right-content">
                <div className="navbar">
                  <h1>🎬 I Love Movies</h1>
                  <div className="profile">
                    <img src={reactLogo} alt="Profile" />
                    <span>{loggedIn ? user.name : 'Guest'}</span>
                    {loggedIn ? (
                      <button 
                        className="login-button" 
                        onClick={() => {
                          localStorage.removeItem('user');
                          localStorage.removeItem("token");
                          setUser(null);
                          setLoggedIn(false);
                        }}
                      >
                        Logout
                      </button>
                    ) : (
                      <Link to="/login">
                        <button className="login-button">Login</button>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="main-content">
                  <CenterContent 
                    ratedMovies={ratedMovies} 
                    searchedMovie={searchedMovie} 
                    setSearchedMovie={setSearchedMovie} 
                    user={user}
                    loggedIn={loggedIn}
                    setUser={setUser}
                  />
                  <div className="right-panel">
                    <div className="right-panel-inner">
                      <h2>🎭 Categories</h2>
                      <ul className="categories-list">
                        <li><Link to="/mywatchlist">My Watch List</Link></li>
                        <li><Link to="/comedy">Comedy</Link></li>
                        <li><Link to="/horror">Horror</Link></li>
                        <li><Link to="/adventure">Adventure</Link></li>
                        <li><Link to="/mystery">Mystery</Link></li>
                        <li><Link to="/action">Action</Link></li>
                        <li><Link to="/scifi">Sci-Fi</Link></li>
                        <li><Link to="/trending">Trending</Link></li>
                        <li><Link to="/top-rated">Top Rated</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
