export default class CoinPaprikaApiService {
  public static async getGlobalStats(): Promise<any> {
    const url = 'https://api.coinpaprika.com/v1/global';
    const globalData = await (await fetch(url)).json();

    return globalData;
  }
}
