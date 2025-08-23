import { Titles } from './catalog.api';

export type Season = {
  id: string;
  title_id: string;
  season_number: number;
  release_year: number;
};

export type Episode = {
  id: string;
  season_id: string;
  episode_number: number;
  name: string;
  synopsis?: string;
  air_date?: string;
  duration_minutes?: number;
  poster_url: string;
};

export interface ICatalogInfoService {
  getShowsSeasons(titleId: string): Promise<{
    items: Season[];
  }>;
  getEpisodes(seasonId: string): Promise<{
    items: Episode[];
  }>;
  getTitle(id: string): Promise<{ items: Titles }>;
}
