export interface Characters {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Array<{
      id: number;
      name: string;
      description: string;
      modified: string;
      resourceURI: string;
      urls: Array<{
        type: string;
        url: string;
      }>;
      thumbnail: {
        path: string;
        extension: string;
      };
      comics: {
        available: number;
        returned: number;
        collectionURI: string;
        items: Array<{
          resourceURI: string;
          name: string;
        }>;
      };
      stories: {
        available: number;
        returned: number;
        collectionURI: string;
        items: Array<{
          resourceURI: string;
          name: string;
          type: string;
        }>;
      };
      events: {
        available: number;
        returned: number;
        collectionURI: string;
        items: Array<{
          resourceURI: string;
          name: string;
        }>;
      };
      series: {
        available: number;
        returned: number;
        collectionURI: string;
        items: Array<{
          resourceURI: string;
          name: string;
        }>;
      };
    }>;
  };
  etag: string;
}

interface Character {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Array<{
      id: number;
      name: string;
      description: string;
      modified: string;
      resourceURI: string;
      urls: Array<{
        type: string;
        url: string;
      }>;
      thumbnail: {
        path: string;
        extension: string;
      };
      comics: {
        available: number;
        returned: number;
        collectionURI: string;
        items: Array<{
          resourceURI: string;
          name: string;
        }>;
      };
      stories: {
        available: number;
        returned: number;
        collectionURI: string;
        items: Array<{
          resourceURI: string;
          name: string;
          type: string;
        }>;
      };
      events: {
        available: number;
        returned: number;
        collectionURI: string;
        items: Array<{
          resourceURI: string;
          name: string;
        }>;
      };
      series: {
        available: number;
        returned: number;
        collectionURI: string;
        items: Array<{
          resourceURI: string;
          name: string;
        }>;
      };
    }>;
  };
  etag: string;
}
