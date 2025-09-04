import React, { useState, useEffect, useCallback } from 'react';
import { searchMovies } from '../api/omdbService';
import { getSearchHistory, saveSearchHistory } from '../utils/storage';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

const HomeScreen = ({ onMovieSelect, onLogout }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        setSearchHistory(getSearchHistory());
        searchMoviesHandler('popular');
    }, []);

    const searchMoviesHandler = useCallback(async (query) => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const results = await searchMovies(query);
            setMovies(results);
            if (query !== 'popular') {
                saveSearchHistory(query);
                setSearchHistory(getSearchHistory());
            }
        } catch (error) {
            console.error('Error searching movies:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md flex justify-between items-center p-4 sticky top-0 z-20">
                <h1 className="text-2xl font-bold">Movies</h1>
                <button onClick={onLogout} className="px-4 py-2 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">Logout</button>
            </header>
            <main>
                <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmit={searchMoviesHandler}
                    searchHistory={searchHistory}
                />
                {loading ? (
                    <div className="flex justify-center items-center p-10">
                        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                        {movies.length > 0 ? (
                           movies.map(movie => <MovieCard key={movie.id} movie={movie} onPress={() => onMovieSelect(movie)} />)
                        ) : (
                            <p className="col-span-full text-center text-gray-500 mt-10">No movies found. Try a different search!</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default HomeScreen;

