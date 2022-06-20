import Project from "models/Project";

export default class CoinGeckoApiService {
	public static async getTopCoins(
		pageSize: number,
		currency: string,
	): Promise<Project[]> {
		const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${pageSize}&page=1`;
		const cryptos = await (await fetch(url)).json();
		const items: Project[] = [];

		cryptos.forEach((element: any) => {
			items.push({
				id: element.id,
				logoUrl: element.image,
				fullLogoUrl: element.image,
				symbol: element.symbol.toUpperCase(),
				shortDescription: element.name,
				name: element.name,
				categories: [
					"🧑‍💻 Technology",
					"💻 Developer"
				],
				tags: ["Blockchain", "Coin"],
				type: "coin",
				description: "",
				imageUrl: "",
				marketCap: element.market_cap
			});
		});

		return items;
	}

	public static async getTrendingCoins(): Promise<Project[]> {
		const url = 'https://api.coingecko.com/api/v3/search/trending';
		const cryptos = await (await fetch(url)).json();
		const items: Project[] = [];

		cryptos.coins.forEach((element: any) => {
			items.push({
				icon: element.item.large,
				ticker: element.item.symbol.toUpperCase(),
				name: element.item.name
			});
		});

		return items;
	}
}