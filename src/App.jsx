import React, { useState, useEffect } from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';

// --- MAIN APP & NAVIGATION ---
export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState('home'); // 'home', 'details'
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        setIsLoggedIn(!!userToken);
        setLoadingAuth(false);
    }, []);
    
    const handleLogin = () => {
        localStorage.setItem('userToken', 'dummy_token');
        setIsLoggedIn(true);
    };
    
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
        setCurrentPage('home');
        setSelectedMovie(null);
    };

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
        setCurrentPage('details');
    };
    
    const handleBack = () => {
        setSelectedMovie(null);
        setCurrentPage('home');
    };
    
    if (loadingAuth) {
         return (
             <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return <LoginScreen onLogin={handleLogin} />;
    }
    
    if (currentPage === 'details') {
        return <MovieDetailsScreen movie={selectedMovie} onBack={handleBack} />;
    }

    return <HomeScreen onMovieSelect={handleMovieSelect} onLogout={handleLogout} />;
}
