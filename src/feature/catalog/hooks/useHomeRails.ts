// /features/catalog/hooks/useHomeRails.ts
import { useQuery, useQueries } from '@tanstack/react-query';
import { useCatalogService } from '../context/CatalogContext';
import { Category } from '../api/catalog.api';

export const useShowsMain = () => {
  const catalogService = useCatalogService();

  return useQuery({
    queryKey: ['home-tile', 'main'],
    queryFn: () => catalogService.getShowsMain(),
    staleTime: 60_000,
  });
};

export const useGetTitles = (category: Category) => {
  const catalogService = useCatalogService();

  return useQuery({
    queryKey: ['tiles', category],
    queryFn: () => catalogService.getTitles(category),
    staleTime: 60_000,
  });
};

export const useCategories = () => {
  const catalogService = useCatalogService();

  return useQuery({
    queryKey: ['Categories'],
    queryFn: () => catalogService.getCategories(),
    staleTime: 60_000,
  });
};

export const useCatalog = () => {
  const catalogService = useCatalogService();
  const categoriesQuery = useCategories();

  const dataQueries = useQueries({
    queries:
      categoriesQuery.data?.map(category => ({
        queryKey: ['home-rails', category.id],
        queryFn: () => catalogService.getTitles(category),
        staleTime: 60_000,
        enabled: !!categoriesQuery.data,
      })) || [],
    combine: results => ({
      data: results.map(r => r.data),
      isLoading: categoriesQuery.isLoading || results.some(r => r.isLoading),
      isError: categoriesQuery.isError || results.some(r => r.isError),
    }),
  });

  return dataQueries;
};
