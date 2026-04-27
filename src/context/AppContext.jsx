import { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

const initialMediaCatalog = [
  { id: 'movie-1', title: 'Frozen II', type: 'Movie', genre: 'Family', rating: 6.8 },
  { id: 'movie-2', title: 'The Simpsons', type: 'Series', genre: 'Comedy', rating: 8.7 },
  { id: 'movie-3', title: 'The Mandalorian', type: 'Series', genre: 'Sci-Fi', rating: 8.6 },
  { id: 'movie-4', title: 'Clone Wars', type: 'Series', genre: 'Animation', rating: 8.4 },
  { id: 'movie-5', title: 'Mickey Mouse Clubhouse', type: 'Series', genre: 'Kids', rating: 5.7 },
  { id: 'movie-6', title: 'Jessie', type: 'Series', genre: 'Family', rating: 6.1 }
];

export function AppProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [watchlistIds, setWatchlistIds] = useState([]);
  const [mediaCatalog] = useState(initialMediaCatalog);

  const filteredMedia = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return mediaCatalog.filter((mediaItem) => {
      const matchesFilter =
        activeFilter === 'All' ||
        mediaItem.type === activeFilter ||
        mediaItem.genre === activeFilter;

      const matchesQuery =
        query.length === 0 || mediaItem.title.toLowerCase().includes(query);

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, mediaCatalog, searchQuery]);

  const toggleWatchlistItem = (mediaId) => {
    setWatchlistIds((currentWatchlist) => {
      if (currentWatchlist.includes(mediaId)) {
        return currentWatchlist.filter((id) => id !== mediaId);
      }

      return [...currentWatchlist, mediaId];
    });
  };

  const clearWatchlist = () => {
    setWatchlistIds([]);
  };

  const contextValue = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      activeFilter,
      setActiveFilter,
      watchlistIds,
      toggleWatchlistItem,
      clearWatchlist,
      mediaCatalog,
      filteredMedia
    }),
    [activeFilter, filteredMedia, mediaCatalog, searchQuery, watchlistIds]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
}
