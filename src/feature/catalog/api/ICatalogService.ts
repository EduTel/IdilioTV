import { Category, GetTitlesResponse, Titles } from './catalog.api';

export interface ICatalogService {
  getShowsMain(): Promise<{ items: Titles[] }>;
  getTitles(category: Category): Promise<GetTitlesResponse>;
  getCategories(): Promise<Category[]>;
}
