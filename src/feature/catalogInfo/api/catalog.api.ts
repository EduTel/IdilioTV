import { supabase } from '../../auth/lib/supabase';
import { Episode, ICatalogInfoService, Season } from './ICatalogInfoService';

export type Titles = {
  id: string;
  title: string;
  poster_url: string;
  synopsis: string;
  release_year: string;
};

export class CatalogInfoService implements ICatalogInfoService {
  async getTitle(id: string): Promise<{ items: Titles }> {
    const { data, error } = await supabase
      .from('titles')
      .select('id, title, poster_url, synopsis, release_year')
      .eq('id', id)
      .limit(1);
    if (error) throw error;
    return { items: data?.[0] ?? [] };
  }
  async getShowsSeasons(titleId: string): Promise<{ items: Season[] }> {
    const { data, error } = await supabase
      .from('seasons')
      .select('id, title_id, season_number, release_year')
      .eq('title_id', titleId)
      .order('season_number', { ascending: true });

    if (error) throw error;
    return { items: data ?? [] };
  }

  async getEpisodes(seasonId: string): Promise<{ items: Episode[] }> {
    const { data: episodesData, error: episodesError } = await supabase
      .from('episodes')
      .select(
        'id, season_id, episode_number, name, synopsis, air_date, duration_minutes, poster_url',
      )
      .eq('season_id', seasonId)
      .order('episode_number', { ascending: true });

    if (episodesError) throw episodesError;

    return {
      items: episodesData ?? [],
    };
  }
}
