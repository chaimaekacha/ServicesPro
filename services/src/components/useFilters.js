import { useMemo } from 'react';

export function useFilters(artisans, filters) {
  const { searchQuery, selectedCity, minRating } = filters;

  return useMemo(() => {
    return artisans.filter(artisan => {
      // 1. Recherche textuelle (nom ou service)
      const matchesSearch = !searchQuery || 
        artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artisan.service.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Filtre par ville
      const matchesCity = !selectedCity || artisan.city === selectedCity;

      // 3. Filtre par note minimale
      const matchesRating = artisan.rating >= (minRating || 0);

      return matchesSearch && matchesCity && matchesRating;
    }).sort((a, b) => b.rating - a.rating); // Tri par note décroissante
  }, [artisans, searchQuery, selectedCity, minRating]);
}