import React, { memo } from 'react';

const MovieCard = memo(({ movie, onPress }) => {
    const defaultImage = 'https://placehold.co/300x450/cccccc/666666?text=No+Image';
    const posterUrl = movie.primaryImage?.url && movie.primaryImage?.url !== "N/A" ? movie.primaryImage.url : defaultImage;

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer" onClick={onPress}>
            <img src={posterUrl} alt={movie.titleText?.text} className="w-full h-64 object-cover" onError={(e) => { e.target.onerror = null; e.target.src=defaultImage }}/>
            <div className="p-4">
                <h3 className="font-bold text-lg truncate">{movie.titleText?.text}</h3>
                <p className="text-gray-600 text-sm">{movie.releaseYear?.year}</p>
                <p className="text-xs text-blue-500 font-semibold mt-1 uppercase">{movie.titleType?.text}</p>
            </div>
        </div>
    );
});

export default MovieCard;
