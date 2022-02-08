import Article from 'models/Article';

const API_KEY = 'b87855666a1043a6b3d915e56cc5cce4';

export default class NewsArticleApiService {
  public static async getLatestCryptoNews(): Promise<Article[]> {
    const url = `https://newsapi.org/v2/everything?q=crypto&pageSize=3&language=en&apiKey=${API_KEY}`;
    const response = await (await fetch(url)).json();
    let articles: Article[] = [];

    response.articles.forEach((article: any) => {
      articles.push({
        title: article.title,
        description: article.description,
        link: article.url,
        imageUrl: article.urlToImage,
        publisherName: article.source.name,
        publishedAt: new Date(article.publishedAt),
      });
    });

    return articles;
  }

  public static async getNftsNews(): Promise<Article[]> {
    const url = `https://newsapi.org/v2/everything?q=nft&pageSize=3&language=en&apiKey=${API_KEY}`;
    const response = await (await fetch(url)).json();
    let articles: Article[] = [];

    response.articles.forEach((article: any) => {
      articles.push({
        title: article.title,
        description: article.description,
        link: article.url,
        imageUrl: article.urlToImage,
        publisherName: article.source.name,
        publishedAt: new Date(article.publishedAt),
      });
    });

    return articles;
  }
}
