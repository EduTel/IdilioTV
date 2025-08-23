import { ICatalogService } from './ICatalogService';

export class MockCatalogService implements ICatalogService {
  async getShowsMain() {
    return {
      items: [
        {
          id: '1',
          title: 'Mock Show',
          poster_url: 'https://example.com/poster.jpg',
        },
      ],
    };
  }

  async getTitles(category: string) {
    return {
      title: category,
      items: [
        {
          id: '1',
          title: 'Mock Show 1',
          poster_url: 'https://example.com/poster1.jpg',
        },
        {
          id: '2',
          title: 'Mock Show 2',
          poster_url: 'https://example.com/poster2.jpg',
        },
      ],
    };
  }

  async getCategories() {
    return [
      { id: '1', name: 'Action' },
      { id: '2', name: 'Drama' },
    ];
  }
}
