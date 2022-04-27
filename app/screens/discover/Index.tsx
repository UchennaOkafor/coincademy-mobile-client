import { useNavigation } from '@react-navigation/native';
import ProjectCardList from 'components/cards/ProjectCardList';
import Spacer from 'components/common/Spacer';
import TitleSectionHeader from 'components/headers/TitleSectionHeader';
import Project from 'models/Project';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Theme } from 'styles/Index';
import SearchBar from 'components/inputs/SearchBox';

const Discover = (): JSX.Element => {
	const navigation = useNavigation();

	const realEstateProjects = [{
		id: '1',
		name: 'Proptee',
		description: 'Profit like a landlord from just €1 with no effort.',
		imageUrl: 'https://notion.proptee.io/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6d4d33f7-2430-4335-8041-02083be69021%2Flogo_square_transparent_background.png?table=block&id=e17e5632-b5e0-4376-8284-54068e5c4158&spaceId=285b45c9-ab36-48a0-b896-b58e40306641&width=2000&userId=&cache=v2'
	}, {
		id: '2',
		name: 'Bricknest',
		description: 'Real estate backed NFTs. Invest and enjoy.',
		imageUrl: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/hrcqzxw59okfbkbmqihq'
	}, {
		id: '3',
		name: 'bHome',
		description: 'A Stable Coin+ backed by U.S. Homes',
		imageUrl: 'https://assets.website-files.com/61eb3243f8c18af6816a1f92/6231e07fe01070dbcdd77cdb_B3_icon_bHome.png'
	}, {
		id: '4',
		name: 'Propy',
		description: 'propy.com',
		imageUrl: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/nfwnhijglxknkmgwwb71'
	}];

	const memeProjects = [{
		id: '1',
		name: 'BabyDoge',
		description: `If you like Dogs then you'll fall in love with Baby Doge.`,
		imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/10407.png'
	}, {
		id: '2',
		name: 'Doge',
		description: 'Dogecoin is an open source peer-to-peer digital currency, favored by Shiba Inus worldwide.',
		imageUrl: 'https://dogecoin.com/assets/img/doge.png'
	}, {
		id: '3',
		name: 'Cardano',
		description: 'A blockchain platform for changemakers, innovators, and visionaries',
		imageUrl: 'https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/cardano_ada-1024.png'
	}, {
		id: '4',
		name: 'Polkadot',
		description: 'Polkadot empowers blockchain networks to work together under the protection of shared security.',
		imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png'
	}, {
		id: '5',
		name: 'Kusama',
		description: `Polkadot's Canary Network`,
		imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5034.png'
	}];

	return (
		<ScrollView 
			style={styles.container}
			showsVerticalScrollIndicator={false}>
			<View style={styles.defaultPadding}>
				<Text style={styles.title}>Explore</Text>
				<Spacer vertical={Theme.spacing.spacing3XS} />
				<Text style={styles.subtitle}>Discover your next favourite crypto project</Text>

				<SearchBar
					placeholder="Search"
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
				style={styles.defaultPadding}
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
				style={styles.defaultPadding}
			/>
			<ProjectCardList
				projects={memeProjects}
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
		...Theme.typography.text.h3,
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
