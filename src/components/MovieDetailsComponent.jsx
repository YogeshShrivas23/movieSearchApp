import React from 'react';

const MovieDetailsComponent = ({ movie, onBack }) => {
    const defaultImage = 'https://placehold.co/300x450/cccccc/666666?text=No+Image';
    const posterUrl = movie.primaryImage?.url && movie.primaryImage.url !== "N/A" ? movie.primaryImage.url : defaultImage;

    // Helper functions to extract data from the new structure
    const getDirector = () => movie.directors?.[0]?.credits?.map(c => c.name.nameText.text).join(', ');
    const getCast = () => movie.actors?.map(a => a.name.nameText.text).slice(0, 5).join(', ');
    const getGenre = () => movie.genres?.genres?.map(g => g.text).join(', ');
    const getRuntime = () => movie.runtime ? `${Math.floor(movie.runtime.seconds / 60)} min` : 'N/A';
    const getLanguage = () => movie.spokenLanguages?.spokenLanguages?.[0]?.text;

    const DetailRow = ({ label, value }) => {
        if (!value || value === 'N/A') return null;
        return (
            <div className="flex flex-wrap py-2 border-b border-gray-200">
                <p className="w-1/3 font-semibold text-gray-800">{label}:</p>
                <p className="w-2/3 text-gray-600">{value}</p>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            <button onClick={onBack} className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
                &larr; Back to Search
            </button>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <img src={posterUrl} alt={movie.titleText?.text} className="w-full md:w-1/3 h-auto object-cover" onError={(e) => { e.target.onerror = null; e.target.src=defaultImage }}/>
                    <div className="p-6 flex-1">
                        <h1 className="text-3xl font-bold text-gray-900">{movie.titleText?.text}</h1>
                        <p className="text-lg text-gray-500 mt-1">{movie.releaseYear?.year}</p>
                        <p className="text-lg font-bold text-yellow-500 mt-2">⭐ {movie.ratingsSummary?.aggregateRating || 'N/A'}</p>
                        <div className="mt-6">
                            <DetailRow label="Director" value={getDirector()} />
                            <DetailRow label="Cast" value={getCast()} />
                            <DetailRow label="Genre" value={getGenre()} />
                            <DetailRow label="Runtime" value={getRuntime()} />
                            <DetailRow label="Language" value={getLanguage()} />
                        </div>
                    </div>
                </div>
                {movie.plot?.plotText?.plainText && (
                    <div className="p-6 border-t border-gray-200">
                        <h2 className="text-xl font-bold mb-2">Plot</h2>
                        <p className="text-gray-700 leading-relaxed">{movie.plot.plotText.plainText}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetailsComponent;
