// Utility functions for localStorage operations

export const getSearchHistory = () => {
    try {
        const history = localStorage.getItem('movieSearchHistory');
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error('Error reading search history:', error);
        return [];
    }
};

export const saveSearchHistory = (query) => {
    try {
        const history = getSearchHistory();
        // Add new query to the beginning and remove duplicates
        const updatedHistory = [
            query,
            ...history.filter(item => item.toLowerCase() !== query.toLowerCase())
        ].slice(0, 5); // Keep only the last 5 searches
        
        localStorage.setItem('movieSearchHistory', JSON.stringify(updatedHistory));
    } catch (error) {
        console.error('Error saving search history:', error);
    }
};
