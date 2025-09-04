import React, { useState, useEffect } from 'react';

const SearchBar = ({ value, onChangeText, onSubmit, searchHistory }) => {
    const [showHistory, setShowHistory] = useState(false);
    const inputRef = React.useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowHistory(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) {
            onSubmit(value);
            setShowHistory(false);
        }
    };

    const handleHistorySelect = (historyItem) => {
        onChangeText(historyItem);
        onSubmit(historyItem);
        setShowHistory(false);
    };

    return (
        <div className="bg-white shadow-md z-10 sticky top-0" ref={inputRef}>
            <form onSubmit={handleSubmit} className="flex items-center p-4 space-x-3">
                <input
                    type="text"
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Search movies or actors..."
                    value={value}
                    onChange={(e) => onChangeText(e.target.value)}
                    onFocus={() => setShowHistory(true)}
                />
                <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition">
                    Search
                </button>
            </form>
            {showHistory && searchHistory.length > 0 && (
                <div className="absolute top-full left-4 right-4 bg-white border border-gray-200 rounded-b-lg shadow-lg max-h-60 overflow-y-auto">
                    <ul>
                        {searchHistory.map((item, index) => (
                            <li key={index} className="px-4 py-3 hover:bg-gray-100 cursor-pointer" onClick={() => handleHistorySelect(item)}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
