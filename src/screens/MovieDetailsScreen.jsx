import React, { useState, useEffect } from 'react';
import { getMovieDetails } from '../api/omdbService';
import MovieDetailsComponent from '../components/MovieDetailsComponent';

const MovieDetailsScreen = ({ movie, onBack }) => {
    const [movieDetails, setMovieDetails] = useState(movie);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!movie.id) return;
            setLoading(true);
            try {
                const details = await getMovieDetails(movie.id);
                if (details) {
                    setMovieDetails(details);
                } else {
                    alert("Could not load movie details. Returning to search.");
                    onBack();
                }
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchDetails();
    }, [movie.id, onBack]);

    if (loading) {
        return (
             <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }
    
    return <MovieDetailsComponent movie={movieDetails} onBack={onBack} />;
};

export default MovieDetailsScreen;

