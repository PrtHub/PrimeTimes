export interface NEWSTYPES {
  author: string;
  title: string;
  url: string;
  content: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
}

export interface CategoryOption {
  value: string;
  label: string;
}

export interface Favorite {
  title: string;
  description: string;
  author: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}
