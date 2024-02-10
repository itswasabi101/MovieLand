
//32b532db
import { useEffect, useState } from "react";

import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg'
const API_URL = 'http://www.omdbapi.com?apikey=32b532db'

// const movie1 = {
//     "Title": "Fighting, Flying and Driving: The Stunts of Spiderman 3",
//     "Year": "2007",
//     "imdbID": "tt1132238",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNTI3NDE1ZmEtMTRiMS00YTY4LTk0OGItNjY4YmI0MDM4OGM4XkEyXkFqcGdeQXVyODE2NDgwMzM@._V1_SX300.jpg"


// }

const App = () => {
    const [movies, setMovies] = useState([]);
    const[searchTerm,setSearchTerm] =useState('');
    const searchMovies = async (title) => {
        const responese = await fetch(`${API_URL}&s=${title}`);
        const data = await responese.json();
        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('Spiderman');

    }, []);

    const handleSearch = () => {
        searchMovies(searchTerm);
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            handleSearch();
        }
    }

    return (

        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={handleSearch}
                />
            </div>
            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found </h2>
                    </div>
                )

            }

        </div>
    );
}
export default App;