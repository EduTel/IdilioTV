import { supabase } from '../../auth/lib/supabase';
import { ICatalogService } from './ICatalogService';

export type Category = {
  id: string;
  name: string;
};

export type Titles = {
  id: string;
  title: string;
  poster_url: string;
};

export type GetTitlesResponse = {
  categoryName: string;
  categoryId: string;
  items: Titles[];
};

export class CatalogService implements ICatalogService {
  async getShowsMain(): Promise<{ items: Titles[] }> {
    const { data, error } = await supabase
      .from('titles')
      .select('id, title, poster_url')
      .eq('main', true)
      .limit(1);
    if (error) throw error;
    return { items: data ?? [] };
  }

  async getTitles(category: Category): Promise<GetTitlesResponse> {
    const { data, error } = await supabase
      .from('titles')
      .select('id, title, poster_url')
      .eq('category_id', category.id)
      .limit(20);
    if (error) throw error;
    return {
      categoryName: category.name,
      categoryId: category.id,
      items: data ?? [],
    };
  }

  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .limit(5);
    if (error) throw error;
    return data as Category[];
  }
}
