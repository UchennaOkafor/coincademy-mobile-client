import Project from 'models/Project';
import { URL } from 'react-native-url-polyfill';

const primaryCategories = {
	memeCoins: 'Meme Coins',
	web3: 'web3',
	stablecoin: 'Stable Coins',
	remittance: 'Remittance',
};

const maps = {
	btc: {
		shortDescription: 'The first ever decentralised cryptocurrency.',
		tags: ['Decentralised', 'Digital Gold'],
		categories: ['🎨 Collectibles'],
		primaryCategory: primaryCategories.web3
	},
	eth: {
		shortDescription: 'Programmable Money',
		tags: ['Programmable Money'],
		categories: ['🔨 Build', '💻 Developer'],
		primaryCategory: primaryCategories.web3
	},
	usdt: {
		shortDescription: 'A stable coin that is built on the Ethereum',
		tags: ['Stable Coin', 'USD'],
		categories: ['💱 Stable Coin'],
		primaryCategory: primaryCategories.stablecoin
	},
	bnb: {
		shortDescription: 'The coin that powers the BNB Chain ecosystem.',
		tags: ['Build and Build'],
		categories: ['🔨 Build'],
		primaryCategory: primaryCategories.web3
	},
	usdc: {
		shortDescription: 'A stable coin that is created by Coinbase',
		tags: ['Stable Coin', 'USD'],
		categories: ['💱 Stable Coin'],
		primaryCategory: primaryCategories.stablecoin
	},
	xrp: {
		shortDescription: 'A controversial coin for cross border payments',
		tags: ['Remittance'],
		categories: ['💸 Payments'],
		// primaryCategory: primaryCategories.remittance
	},
	busd: {
		shortDescription: 'A stable coin that is created by Binance',
		tags: ['Stable Coin', 'USD'],
		categories: ['💱 Stable Coin'],
		primaryCategory: primaryCategories.stablecoin
	},
	doge: {
		shortDescription: 'The first meme coin, that is now serious. So a serious coin?',
		tags: ['Woof'],
		categories: ['🐕 Meme Coin'],
		primaryCategory: primaryCategories.memeCoins
	},
	shib: {
		shortDescription: 'A meme coin that wanted to be like Doge coin',
		tags: ['DOGE killer', 'Woof'],
		categories: ['🐕 Meme Coin'],
		primaryCategory: primaryCategories.memeCoins
	},
	ada: {
		shortDescription: 'A for profit and better version of Ethereum',
		tags: ['Ethereum rival'],
		categories: ['💼 Business'],
		primaryCategory: primaryCategories.web3
	},
	sol: {
		shortDescription: 'A very fast and powerful blockchain',
		tags: ['I\'m fast as fuck boy'],
		categories: ['💻 Developer', '🌎 web3'],
		primaryCategory: primaryCategories.web3
	},
	matic: {
		shortDescription: 'Scaleable and instant blockchain transactions.',
		tags: ['Cheaper Ethereum'],
		categories: ['🌎 web3'],
		primaryCategory: primaryCategories.web3
	},
	dot: {
		shortDescription: 'Connecting all the blockchains together.',
		tags: ['The internet for blockchains'],
		categories: ['🌎 web3'],
		primaryCategory: primaryCategories.web3
	},
	steth: {
		shortDescription: 'Liquidity for staked assets',
		tags: ['Staking', 'WAGMI'],
		categories: ['💸 Passive Income'],
		// primaryCategory: primaryCategories.remittance
	},
	trx: {
		shortDescription: 'Connecting users and creators',
		tags: ['Creators'],
		categories: ['📹 Creators'],
		primaryCategory: primaryCategories.web3
	},
	dai: {
		shortDescription: 'A stable coin backed by Ethereum & pegged to the USD',
		tags: ['USD', 'Ethereum'],
		categories: ['💱 Stable Coin'],
		primaryCategory: primaryCategories.stablecoin
	},
	ltc: {
		shortDescription: 'A copy & paste version of Bitcoin, but it\'s faster',
		tags: ['Fast Bitcoin', 'Remittance'],
		categories: ['💸 Payments'],
		primaryCategory: primaryCategories.remittance
	},
	okb: {
		shortDescription: 'The utility token of the OKX ecosystem',
		tags: ['Utility Token'],
		categories: ['🛠️ Utility'],
		// primaryCategory: primaryCategories.stablecoin
	},
};

export default class CoinGeckoApiService {
	public static async getTopCoins(
		pageSize: number,
		currency: string,
	): Promise<Project[]> {
		const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${pageSize}&page=1`;
		const cryptos = await (await fetch(url)).json();
		const items: Project[] = [];

		cryptos.forEach((element: any) => {
			const coin = maps[element.symbol.toLowerCase()];

			items.push({
				id: element.id,
				logoUrl: element.image,
				fullLogoUrl: element.image,
				symbol: element.symbol.toUpperCase(),
				shortDescription: coin?.shortDescription ?? element.name,
				primaryCategory: coin?.primaryCategory,
				name: element.name,
				categories: coin?.categories ?? [],
				tags: coin?.tags ?? [],
				type: 'coin',
				description: '',
				imageUrl: '',
				marketCap: element.market_cap,
				links: {
					website: '',
					discord: '',
					twitter: '',
					reddit: {
						link: '',
						label: '',
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
				'🧑‍💻 Technology',
				'💻 Developer'
			],
			tags: ['Blockchain', 'Coin'],
			type: 'coin',
			imageUrl: '',
			marketCap: coin.market_cap,
			links: {
				website: {
					label: new URL(coin.links.homepage[0])?.hostname?.replace('www.', '') ?? '',
					link: coin.links.homepage[0]
				},
				discord: coin.links.chat_url[0] ?? '',
				twitter: {
					label: coin.links.twitter_screen_name,
					link: `https://twitter.com/${coin.links.twitter_screen_name}`,
				},
				reddit: {
					label: coin.links.subreddit_url?.split('/r/')[1]?.replace('/', '') ?? '',
					link: coin.links.subreddit_url ?? '',
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