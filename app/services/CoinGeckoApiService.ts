import Security from 'models/Security';

export default class CoinGeckoApiService {
  public static async getTopCryptos(
    pageSize: number,
    currency: string,
  ): Promise<Security[]> {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${pageSize}&page=1`;
    const cryptos = await (await fetch(url)).json();
    const items: Security[] = [];

    cryptos.forEach((element: any) => {
      items.push({
        icon: element.image,
        ticker: element.symbol.toUpperCase(),
        name: element.name,
        shares: 0,
        investmentValue: element.current_price,
        investmentGainOrLoss: element.price_change_percentage_24h,
      });
    });

    return items;
  }

  public static async getTrendingCryptos(): Promise<Security[]> {
    const url = 'https://api.coingecko.com/api/v3/search/trending';
    const cryptos = await (await fetch(url)).json();
    const items: Security[] = [];

    cryptos.coins.forEach((element: any) => {
      items.push({
        icon: element.item.large,
        ticker: element.item.symbol.toUpperCase(),
        name: element.item.name,
        shares: 0,
        investmentValue: element.item.price_btc,
        investmentGainOrLoss: 0,
      });
    });

    return items;
  }
}
