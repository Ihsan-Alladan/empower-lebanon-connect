
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FavoriteItem } from '@/types/product';

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  
  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('empowera-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
        localStorage.removeItem('empowera-favorites');
      }
    }
  }, []);
  
  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('empowera-favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  const addToFavorites = (productId: string) => {
    setFavorites(prev => {
      // Check if already in favorites
      if (prev.some(item => item.productId === productId)) {
        return prev;
      }
      
      // Add to favorites with current date
      return [...prev, {
        productId,
        dateAdded: new Date().toISOString()
      }];
    });
  };
  
  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(item => item.productId !== productId));
  };
  
  const isFavorite = (productId: string) => {
    return favorites.some(item => item.productId === productId);
  };
  
  const clearFavorites = () => {
    setFavorites([]);
  };
  
  const favoritesCount = favorites.length;
  
  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
        favoritesCount
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
