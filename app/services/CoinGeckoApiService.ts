import Project from "models/Project";
import { URL } from 'react-native-url-polyfill';

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
				marketCap: element.market_cap,
				links: {
					website: "",
					discord: "",
					twitter: "",
					reddit: {
						link: "",
						name: "",
					}
				}
			});
		});

		return items;
	}

	public static async getCoinById(
		id: string,
	): Promise<Project> {
		const url = `https://api.coingecko.com/api/v3/coins/${id}`;
		const coin = await (await fetch(url)).json();
		const item: Project = {
			id: coin.id,
			logoUrl: coin.image,
			fullLogoUrl: coin.image,
			symbol: coin.symbol.toUpperCase(),
			shortDescription: coin.ico_data?.short_desc ?? coin.name,
			name: coin.name,
			description: coin.description.en,
			categories: [
				"🧑‍💻 Technology",
				"💻 Developer"
			],
			tags: ["Blockchain", "Coin"],
			type: "coin",
			imageUrl: "",
			marketCap: coin.market_cap,
			links: {
				website: {
					label: new URL(coin.links.homepage[0]).hostname.replace('www.', ''),
					link: coin.links.homepage[0]
				},
				discord: coin.links.chat_url[0],
				twitter: {
					label: coin.links.twitter_screen_name,
					link: `https://twitter.com/${coin.links.twitter_screen_name}`,
				},
				reddit: {
					label: coin.links.subreddit_url.split("/r/")[1].replace("/", ""),
					link: coin.links.subreddit_url,
				}
			}
		};

		return item;
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