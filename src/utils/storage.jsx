// --- UTILS: localStorage for Search History ---
const SEARCH_HISTORY_KEY = 'movieAppSearchHistory';
const MAX_HISTORY_ITEMS = 5;

export const getSearchHistory = () => {
  try {
    const historyJson = localStorage.getItem(SEARCH_HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error('Error getting search history:', error);
    return [];
  }
};

export const saveSearchHistory = (query) => {
  try {
    const currentHistory = getSearchHistory();
    const filteredHistory = currentHistory.filter(
      (item) => item.toLowerCase() !== query.toLowerCase()
    );
    const newHistory = [query, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('Error saving search history:', error);
  }
};
