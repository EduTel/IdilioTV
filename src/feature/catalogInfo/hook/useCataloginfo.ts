import { useQuery } from '@tanstack/react-query';
import { useCatalogInfoService } from '../context/CatalogInfoContext';

export const useShowsSeasons = (titleId: string) => {
  const catalogInfoService = useCatalogInfoService();

  return useQuery({
    queryKey: ['catalog-info', 'seasons', titleId],
    queryFn: () => catalogInfoService.getShowsSeasons(titleId),
    staleTime: 5 * 60 * 1000,
    enabled: !!titleId,
  });
};

export const useEpisodes = (seasonId: string) => {
  const catalogInfoService = useCatalogInfoService();

  return useQuery({
    queryKey: ['catalog-info', 'episodes', seasonId],
    queryFn: () => catalogInfoService.getEpisodes(seasonId),
    staleTime: 5 * 60 * 1000,
    enabled: !!seasonId,
  });
};

export const useGetTitle = (id: string) => {
  const catalogInfoService = useCatalogInfoService();

  return useQuery({
    queryKey: ['tile', id],
    queryFn: () => catalogInfoService.getTitle(id),
    staleTime: 60_000,
  });
};
