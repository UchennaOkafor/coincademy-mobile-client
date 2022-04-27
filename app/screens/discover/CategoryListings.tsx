import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import CardList from 'components/cards/CardList';
import Spacer from 'components/common/Spacer';
import HeaderBackButton from 'components/headers/HeaderBackButton';
import Project from 'models/Project';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from 'styles/Index';

interface CategoryRouteProps {
	category: any;
}

const CategoryListings = (): JSX.Element => {
	const navigation = useNavigation();
	const route = useRoute<RouteProp<{ params: CategoryRouteProps }, 'params'>>();
	const insets = useSafeAreaInsets();

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
		<ScrollView style={[styles.container, {paddingTop: insets.top + Theme.spacing.spacingM}]}>
			<HeaderBackButton
				onPress={() => navigation.goBack()}
			/>
			<Spacer vertical={Theme.spacing.spacingXS} />
			<Text style={styles.title}>Real Estate 🏡</Text>
			<Spacer vertical={Theme.spacing.spacingXS} />
			<CardList
				projects={memeProjects}
				onPress={(project: Project) => {}}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: Theme.spacing.spacingM,
		backgroundColor: Theme.colors.backgroundGray
	},
	title: {
		...Theme.typography.text.h4,
	}
});

export default CategoryListings;
