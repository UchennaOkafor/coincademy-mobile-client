import { useNavigation } from '@react-navigation/native';
import ProjectCardList from 'components/cards/ProjectCardList';
import Spacer from 'components/common/Spacer';
import TitleSectionHeader from 'components/headers/TitleSectionHeader';
import Project from 'models/Project';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Theme } from 'styles/Index';
import SearchBar from 'components/inputs/SearchBox';
import CollectibleCardList from 'components/cards/CollectibleCardList';

const Discover = (): JSX.Element => {
	const navigation = useNavigation();

	const realEstateProjects = [{
		id: '1',
		name: 'Proptee',
		description: 'Profit like a landlord from just €1 with no effort.',
		logoUrl: 'https://notion.proptee.io/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6d4d33f7-2430-4335-8041-02083be69021%2Flogo_square_transparent_background.png?table=block&id=e17e5632-b5e0-4376-8284-54068e5c4158&spaceId=285b45c9-ab36-48a0-b896-b58e40306641&width=2000&userId=&cache=v2',
		type: 'project'
	}, {
		id: '2',
		name: 'Bricknest',
		description: 'Real estate backed NFTs. Invest and enjoy.',
		logoUrl: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/hrcqzxw59okfbkbmqihq',
		type: 'project'
	}, {
		id: '3',
		name: 'bHome',
		description: 'A Stable Coin+ backed by U.S. Homes',
		logoUrl: 'https://assets.coingecko.com/coins/images/25173/large/bacon-200.png?1650526720',
		type: 'project'
	}, {
		id: '4',
		name: 'Propy',
		description: 'propy.com',
		logoUrl: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/nfwnhijglxknkmgwwb71',
		type: 'project'
	}];

	const memeProjects = [{
		id: '1',
		name: 'BabyDoge',
		description: `If you like Dogs then you'll fall in love with Baby Doge.`,
		logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/10407.png',
		type: 'token'
	}, {
		id: '2',
		name: 'Doge',
		description: 'Dogecoin is an open source peer-to-peer digital currency, favored by Shiba Inus worldwide.',
		logoUrl: 'https://dogecoin.com/assets/img/doge.png',
		type: 'coin'
	}, {
		id: '3',
		name: 'Cardano',
		description: 'A blockchain platform for changemakers, innovators, and visionaries',
		logoUrl: 'https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-1024.png',
		type: 'coin'
	}, {
		id: '4',
		name: 'Polkadot',
		description: 'Polkadot empowers blockchain networks to work together under the protection of shared security.',
		logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png',
		type: 'coin'
	}, {
		id: '5',
		name: 'Kusama',
		description: `Polkadot's Canary Network`,
		logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5034.png',
		type: 'coin'
	}];

	const collectibles = [{
		id: '1',
		name: 'BoredApe #162',
		description: `If you like Dogs then you'll fall in love with Baby Doge.`,
		imageUrl: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg'
	}, {
		id: '2',
		name: 'CryptoKittie #2762',
		description: 'Dogecoin is an open source peer-to-peer digital currency, favored by Shiba Inus worldwide.',
		imageUrl: 'https://unframed.lacma.org/sites/default/files/styles/article_full/public/field/image/Screen%20Shot%202021-06-09%20at%205.21.55%20PM.png?itok=o0fDqYx6'
	}, {
		id: '3',
		name: 'Pixel Art #684',
		description: 'A blockchain platform for changemakers, innovators, and visionaries',
		imageUrl: 'https://www.cnet.com/a/img/resize/180806b9e13bc1d1750aeef34e28f173dc2ee7e3/2021/11/29/f566750f-79b6-4be9-9c32-8402f58ba0ef/richerd.png?auto=webp&width=940'
	}, {
		id: '4',
		name: 'Pixel Art #321',
		description: 'Polkadot empowers blockchain networks to work together under the protection of shared security.',
		imageUrl: 'https://lh3.googleusercontent.com/XA1nBAsxklaTvzPk5BX6Eb35gOnc-Uk9AVxvN6rW5Iq2g6MDcYI6FCqrPRhkG8DzEwZysTgaoqfgAmzTKFLM8MVDRFAGE7HGTdhR2Q=w600'
	}];

	return (
		<ScrollView 
			style={styles.container}
			showsVerticalScrollIndicator={false}>
			<View style={styles.defaultPadding}>
				<Spacer vertical={Theme.spacing.spacing2XS} />
				<Text style={styles.title}>Discover</Text>
				<Spacer vertical={Theme.spacing.spacing3XS} />
				<Text style={styles.subtitle}>Explore the world of web3</Text>
				<Spacer vertical={Theme.spacing.spacing3XS} />

				<SearchBar
					placeholder="Search topics & projects"
					containerStyle={styles.searchBar}
					onChangeText={() => {}}
					onSubmitEditing={() => { }}
					cancelTitleStyle={styles.searchBarCancelTitle}
					textInputStyle={styles.searchBarInput}
					borderRadius={Theme.radius.large}
				/>
			</View>

			<Spacer vertical={Theme.spacing.spacingS} />
			<TitleSectionHeader
				title="Real estate 🏡"
				rightText="View More"
				rightTextOnPress={() => navigation.navigate('CategoryListings')}
				containerStyle={styles.defaultPadding}
			/>
			<ProjectCardList
				projects={realEstateProjects}
				contentContainertStyle={styles.projectCardList}
				onPress={(project: Project) => navigation.navigate('ProjectOverview', { project })}
			/>

			<Spacer vertical={Theme.spacing.spacingS} />
			<TitleSectionHeader
				title="Meme Coins"
				rightText="View More"
				rightTextOnPress={() => navigation.navigate('CategoryListings')}
				containerStyle={styles.defaultPadding}
			/>
			<ProjectCardList
				projects={memeProjects}
				contentContainertStyle={styles.projectCardList}
				onPress={(project: Project) => navigation.navigate('ProjectOverview', { project })}
			/>

			<Spacer vertical={Theme.spacing.spacingS} />
			<TitleSectionHeader
				title="Collectibles & NFTs"
				rightText="View More"
				rightTextOnPress={() => navigation.navigate('CategoryListings')}
				containerStyle={styles.defaultPadding}
			/>
			<CollectibleCardList
				items={collectibles}
				contentContainertStyle={styles.projectCardList}
				onPress={(project: Project) => navigation.navigate('ProjectOverview', { project })}
			/>
			<Spacer vertical={Theme.spacing.spacing2XL} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Theme.spacing.spacing2XS,
		backgroundColor: Theme.colors.backgroundGray
	},
	defaultPadding: {
		paddingHorizontal: Theme.spacing.spacingM
	},
	title: {
		...Theme.typography.text.h2,
		...Theme.typography.weight.extraBold
	},
	subtitle: {
		...Theme.typography.text.h6,
		...Theme.typography.weight.normal,
		color: Theme.colors.grayDark
	},
	searchBar: {
		marginVertical: Theme.spacing.spacingS 
	},
	searchBarCancelTitle: {
		...Theme.typography.text.h6,
		...Theme.typography.weight.semiBold,
		color: Theme.colors.purple,
	},
	searchBarInput: {
		...Theme.typography.text.h6, 
		...Theme.typography.weight.medium, 
		lineHeight: undefined
	},
	projectCardList: {
		paddingVertical: Theme.spacing.spacingS, 
		paddingHorizontal: Theme.spacing.spacingM
	}
});

export default Discover;
