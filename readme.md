# React Movie Search Application

A responsive web application for browsing movies, built with React and styled with Tailwind CSS. This app fetches live data from the OMDb API to provide real-time search results and detailed movie information.

## Features

-   **User Authentication**: A dummy login screen to simulate a user session.
-   **Live Movie Search**: Search for movies by title using the OMDb API.
-   **Movie Details**: Click on any movie to see a detailed view including the plot, director, cast, rating, and more.
-   **Search History**: The application saves your last 5 unique search queries in the browser's local storage for quick access.
-   **Responsive Design**: The interface is fully responsive and works smoothly on desktop, tablet, and mobile devices.
-   **Loading & Error States**: Clear loading indicators and fallback messages provide a smooth user experience.

---

## Folder Structure

The project is organized into a standard, scalable React application structure to keep the code clean and maintainable.

```

/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── omdbService.js      \# Handles all API requests
│   ├── components/
│   │   ├── MovieCard.jsx       \# Reusable movie poster card
│   │   ├── SearchBar.jsx       \# Search input component
│   │   └── MovieDetailsComponent.jsx \# Detailed view UI
│   ├── screens/
│   │   ├── HomeScreen.jsx      \# Main movie grid page
│   │   ├── LoginScreen.jsx     \# Login page
│   │   └── MovieDetailsScreen.jsx \# Page for movie details
│   ├── utils/
│   │   └── storage.js          \# Helpers for local storage
│   ├── App.jsx                 \# Main component for navigation
│   └── index.js                \# React app entry point
└── package.json

````

---

## Setup and Installation

Follow these steps to get the project running on your local machine.

### Prerequisites

-   Node.js (v14 or later)
-   npm or yarn

### 1. Clone the Repository

First, clone the project repository to your local machine.

```bash
git clone <your-repository-url>
cd movie-search-app
````

### 2\. Install Dependencies

Install the necessary project dependencies using npm or yarn.

```bash
npm install
```

or

```bash
yarn install
```

### 3\. Set Up Your API Key

This project requires a free API key from the OMDb API.

1.  Visit [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx) and request a key.
2.  Open the `src/api/omdbService.js` file.
3.  Replace the placeholder `'YOUR_API_KEY_HERE'` with the key you received.

<!-- end list -->

```javascript
// in src/api/omdbService.js
const API_KEY = 'YOUR_API_KEY'; // <-- Paste your key here
```

### 4\. Run the Application

Once the dependencies are installed and the API key is set, you can start the development server.

```bash
npm start
```

or

```bash
yarn start
```

The application will automatically open in your default web browser at `http://localhost:3000`.

```
```