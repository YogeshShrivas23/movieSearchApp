// --- SERVICES: API Calls (Live OMDb API) ---
const API_KEY = '765b1ddd'; 
const API_BASE_URL = `https://www.omdbapi.com/`;

export const searchMovies = async (query) => {
  const searchTerm = query.toLowerCase() === 'popular' ? 'action' : query;
  
  try {
    const response = await fetch(`${API_BASE_URL}?s=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}`);
    if (!response.ok) throw new Error(`Network response was not ok. Status: ${response.status}`);
    const data = await response.json();
    
    if (data.Response === 'True' && data.Search) {
        // Map OMDb response to the structure our components expect
        return data.Search.map(movie => ({
            id: movie.imdbID,
            primaryImage: { url: movie.Poster },
            titleText: { text: movie.Title },
            releaseYear: { year: movie.Year },
            titleType: { text: movie.Type }
        }));
    } else {
        console.warn(data.Error); // "Movie not found!" is a common, valid response
        return [];
    }
  } catch (error) {
    console.error('API Fetch Error:', error);
    alert('Failed to fetch movies. Please check your connection.');
    return [];
  }
};

export const getMovieDetails = async (titleId) => {
   try {
    const response = await fetch(`${API_BASE_URL}?i=${titleId}&plot=full&apikey=${API_KEY}`);
    if (!response.ok) throw new Error(`Network response was not ok. Status: ${response.status}`);
    const data = await response.json();
    
    if (data.Response === 'True') {
        // Map detailed OMDb response to the more complex structure our component expects
        const runtimeInSeconds = data.Runtime && data.Runtime !== "N/A" ? parseInt(data.Runtime) * 60 : null;
        return {
            id: data.imdbID,
            primaryImage: { url: data.Poster },
            titleText: { text: data.Title },
            releaseYear: { year: data.Year },
            ratingsSummary: { aggregateRating: data.imdbRating },
            plot: { plotText: { plainText: data.Plot } },
            directors: data.Director !== "N/A" ? [{ credits: data.Director.split(', ').map(name => ({ name: { nameText: { text: name } } })) }] : [],
            actors: data.Actors !== "N/A" ? data.Actors.split(', ').map(name => ({ name: { nameText: { text: name } } })) : [],
            genres: { genres: data.Genre !== "N/A" ? data.Genre.split(', ').map(g => ({ text: g })) : [] },
            runtime: runtimeInSeconds ? { seconds: runtimeInSeconds } : null,
            spokenLanguages: { spokenLanguages: data.Language !== "N/A" ? data.Language.split(', ').map(l => ({ text: l })) : [] }
        };
    } else {
        console.error('API Fetch Error:', data.Error);
        return null;
    }
   } catch(error) {
     console.error('API Fetch Error:', error);
     alert('Failed to fetch movie details. Please check your connection.');
     return null;
   }
};

