import React, { useEffect, useState, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import clearIcon from '../assets/circle_remove.svg';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

const Navbar = ({ movies, searchedMovie, setSearchedMovie }) => {
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setShowSuggestions(true);
    debouncedChangeHandler(value);
  };
  
  const debouncedChangeHandler = useCallback(
    debounce((value) => {
      setQuery(value);
      setShowSuggestions(!!value.trim());
    }, 0),
    []
  );

  const handleClearInput = () => {
    setQuery('');
    setShowSuggestions(false);
  };


  const filteredMovies = useMemo(() => {
    if (!query) return [];
    const results = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(query.toLowerCase())
    );
    console.log('Filtered Movies:', results); // Add this
    return results;
  }, [movies, query]);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  const handleSuggestionClick = useCallback((movie) => {
    setSelectedMovie(movie);
    setQuery(movie.title);
    setShowSuggestions(false);
    setSearchedMovie(movie);
    setSearchedMovie(movie);
  }, []);

  const handletitleClick = useCallback((movie) => {
    setSelectedMovie(movie);
    setQuery(movie.Title);
    setSearchedMovie(movie);
    console.log("searchedMovie from nav bar:- ",searchedMovie);
    
  }, []);

  return (
    <div className="nav" style={{
      display: 'flex',
      width: '200px',
      padding: '1rem 2rem',
      backgroundColor: '#1a1a1a',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      height: '100vh',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }}>
      <style>{`
        .search-container {
          position: relative;
          width: 100%;
          margin-top: 1rem;
        }

        .search-input-wrapper {
          position: relative;
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 12px 40px 12px 45px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          background: #2d2d2d;
          color: white;
          font-size: 14px;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--accent-color);
          box-shadow: 0 0 15px rgba(229, 9, 20, 0.15);
          background: #333333;
        }

        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          pointer-events: none;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }

        .search-input:focus + .search-icon {
          opacity: 1;
        }

        .clear-button {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          opacity: 0.6;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .clear-button:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-50%) scale(1.1);
        }

        .suggestions {
          position: absolute;
          width: calc(100% + 20px);
          max-height: 400px;
          overflow-y: auto;
          background: #2d2d2d;
          border-radius: 12px;
          margin-top: 10px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          z-index: 9999;
          left: -10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .suggestions::-webkit-scrollbar {
          width: 8px;
        }

        .suggestions::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        .suggestions::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        .suggestions::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .suggestion-item {
          padding: 14px 20px;
          color: white;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .suggestion-item:last-child {
          border-bottom: none;
        }

        .suggestion-item:hover {
          background: rgba(229, 9, 20, 0.1);
          padding-left: 25px;
        }

        .suggestion-link {
          color: #e6e6e6 !important;
          text-decoration: none;
          font-size: 14px !important;
          font-weight: 400 !important;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .suggestion-link:hover {
          color: var(--accent-color) !important;
        }

        .movie-icon {
          color: #666;
          font-size: 16px;
          margin-right: 8px;
        }

        .no-results {
          padding: 20px;
          color: #888;
          font-size: 14px;
          text-align: center;
          font-style: italic;
        }
      `}</style>

      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search movies..."
            className="search-input"
          />
          <span className="search-icon">🔍</span>
          {query && (
            <button onClick={handleClearInput} className="clear-button">
              <img src={clearIcon} alt="Clear" style={{ width: '16px', height: '16px' }} />
            </button>
          )}
        </div>
        {showSuggestions && query && (
          <div className="suggestions">
            {filteredMovies.length > 0 ? (
              filteredMovies.slice(0, 15).map((movie) => (
                <div
                  key={movie.imdbID}
                  className="suggestion-item"
                >
                  <Link 
                    to="/searchedMovie" 
                    onClick={() => handletitleClick(movie)}
                    className="suggestion-link"
                  >
                    <span className="movie-icon">🎬</span>
                    {movie.Title}
                  </Link>
                </div>
              ))
            ) : (
              <div className="no-results">No movies found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
