import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const supportedLngs = {
  en: 'English',
  hi: 'हिन्दी',
};

const resources = {
  en: {
    translation: {
      app: {
        title: 'Cineverse',
        search: 'Search Movies',
        searchBtn: 'Search',
        clear: 'Clear',
        favorites: 'Favorites',
        home: 'Home',
        details: 'Details',
        loading: 'Loading...',
        error: 'Something went wrong',
        searchError: 'Please enter a movie name to search',
        back: 'Back',
        language: 'Language',
        startSearching: 'START SEARCHING',
        searchPlaceholder: 'Search for movies...',
        welcomeMessage: 'Welcome to Cineverse! Your gateway to exploring movies.',
        copyright: 'Cineverse © 2025',
        searchPageTitle: 'Search for movies...',
        searchResults: 'Search Results for "{{query}}"',
        released: 'Released',
        viewOnImdb: 'View on IMDb',
        cappedResults: 'Showing 500 results out of {{total}} total results. Please refine your search to see more specific results.',
        tooManyResults50: 'Showing top 50 results out of many found. Please refine your search for better results.',
        type: 'Type',
      },
      movie: {
        about: 'About',
        year: 'Year',
        plot: 'Plot',
        director: 'Director',
        actors: 'Actors',
        addToFavorites: 'Add to Favorites',
        removeFromFavorites: 'Remove from Favorites',
        type: 'Type',
      },
      filter: {
        allYears: 'All Years',
        allTypes: 'All Types',
        movie: 'Movie',
        series: 'Series',
        episode: 'Episode',
      },
      errors: {
        'Movie not found!': 'No movies found',
        'Too many results.': 'Too many results. Please refine your search.',
        'Incorrect IMDb ID.': 'Incorrect IMDb ID.',
        'Something went wrong.': 'Something went wrong.',
        'Search query cannot be empty.': 'Please write something in the search box.',
      },
    },
  },
  hi: {
    translation: {
      app: {
        title: 'सिनेवर्स',
        search: 'फिल्में खोजें',
        searchBtn: 'खोजें',
        clear: 'साफ करें',
        favorites: 'पसंदीदा',
        home: 'होम',
        details: 'विवरण',
        loading: 'लोड हो रहा है...',
        error: 'कुछ गलत हो गया',
        searchError: 'खोजने के लिए कृपया फिल्म का नाम दर्ज करें',
        back: 'पीछे',
        language: 'भाषा',
        startSearching: 'खोज शुरू करें',
        searchPlaceholder: 'फिल्म का शीर्षक खोजें...',
        welcomeMessage: 'सिनेवर्स में आपका स्वागत है! फिल्मों की खोज के लिए आपका प्रवेश द्वार।',
        copyright: 'सिनेवर्स © 2025 प्रतिलिप्यधिकार सुरक्षित',
        searchPageTitle: 'फिल्में खोजें...',
        searchResults: '"{{query}}" के लिए खोज परिणाम',
        released: 'रिलीज़',
        viewOnImdb: 'IMDb पर देखें',
        cappedResults: 'कुल {{total}} में से 500 परिणाम दिखाए जा रहे हैं। कृपया और विशिष्ट परिणाम देखने के लिए अपनी खोज को सीमित करें।',
        tooManyResults50: 'कई परिणामों में से शीर्ष 50 परिणाम दिखाए जा रहे हैं। कृपया बेहतर परिणामों के लिए अपनी खोज को सीमित करें।',
        type: 'प्रकार',
      },
      movie: {
        about: 'परिचय',
        year: 'वर्ष',
        plot: 'कथानक',
        director: 'निर्देशक',
        actors: 'अभिनेता',
        addToFavorites: 'पसंदीदा में जोड़ें',
        removeFromFavorites: 'पसंदीदा से हटाएं',
        type: 'प्रकार',
      },
      filter: {
        allYears: 'सभी वर्ष',
        allTypes: 'सभी प्रकार',
        movie: 'फ़िल्म',
        series: 'श्रृंखला',
        episode: 'एपिसोड',
      },
      errors: {
        'Movie not found!': 'फ़िल्म नहीं मिली!',
        'Too many results.': 'बहुत अधिक परिणाम। कृपया अधिक विशिष्ट खोजें।',
        'Incorrect IMDb ID.': 'ग़लत IMDb आईडी।',
        'Something went wrong.': 'कुछ गलत हो गया।',
        'Search query cannot be empty.': 'कृपया खोज बॉक्स में कुछ लिखें।',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: Object.keys(supportedLngs),
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'querystring', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
