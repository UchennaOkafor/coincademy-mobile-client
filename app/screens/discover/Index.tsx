import { useNavigation } from '@react-navigation/native';
import ProjectCardList from 'components/cards/ProjectCardList';
import Spacer from 'components/common/Spacer';
import TitleSectionHeader from 'components/headers/TitleSectionHeader';
import Project from 'models/Project';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Theme } from 'styles/Index';
import SearchBar from 'components/inputs/SearchBox';
import CollectibleCardList from 'components/cards/CollectibleCardList';
import BaseLayout from 'components/layout/BaseLayout';
import Header from 'components/headers/Header';
import { getAuth } from 'firebase/auth';
import { useQuery } from '@tanstack/react-query';
import CoinGeckoApiService from 'services/CoinGeckoApiService';
import * as lodash from 'lodash';

const Discover = (): JSX.Element => {
	const navigation = useNavigation();

	const { data: projects } = useQuery(['coins'], async () => {
		return await CoinGeckoApiService.getTopCoins(15, 'USD');
	});

	const [searchTerm, setSearchTerm] = useState('');

	const collectibles = [{
		id: '1',
		name: 'BoredApe #162',
		description: `BoredApe #162`,
		imageUrl: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg'
	}, {
		id: '2',
		name: 'CryptoKittie #2762',
		description: 'CryptoKittie #2762',
		imageUrl: 'https://unframed.lacma.org/sites/default/files/styles/article_full/public/field/image/Screen%20Shot%202021-06-09%20at%205.21.55%20PM.png?itok=o0fDqYx6'
	}, {
		id: '3',
		name: 'Pixel Art #684',
		description: 'Pixel Art #684',
		imageUrl: 'https://www.cnet.com/a/img/resize/180806b9e13bc1d1750aeef34e28f173dc2ee7e3/2021/11/29/f566750f-79b6-4be9-9c32-8402f58ba0ef/richerd.png?auto=webp&width=940'
	}, {
		id: '4',
		name: 'Pixel Art #321',
		description: 'Pixel Art #321',
		imageUrl: 'https://lh3.googleusercontent.com/XA1nBAsxklaTvzPk5BX6Eb35gOnc-Uk9AVxvN6rW5Iq2g6MDcYI6FCqrPRhkG8DzEwZysTgaoqfgAmzTKFLM8MVDRFAGE7HGTdhR2Q=w600'
	}];

	const filteredProjects = projects
		?.filter(e => e.primaryCategory != null)
		.filter(e => e.shortDescription.toLowerCase().includes(searchTerm) || e.name.toLocaleLowerCase().includes(searchTerm));

	const filteredCollectibles = collectibles
		.filter(e => e.name.toLowerCase().includes(searchTerm) || e.description.toLocaleLowerCase().includes(searchTerm));

	const groupedProjects = lodash.groupBy(filteredProjects, e => e.primaryCategory);

	return (
		<BaseLayout
			scrollable={true}>
			<Header
				title="Discover"
				user={getAuth().currentUser}
				onProfilePress={() => navigation.navigate('Profile')}
				onSettingsPress={() => navigation.navigate('Settings')}
			/>
			<Spacer vertical={Theme.spacing.spacing3XS} />
			<Text style={styles.subtitle}>Explore the world of web3</Text>
			<Spacer vertical={Theme.spacing.spacing3XS} />

			<SearchBar
				placeholder="Search coins & projects"
				containerStyle={styles.searchBar}
				onChangeText={(value) => setSearchTerm(value.toLocaleLowerCase())}
				onSubmitEditing={() => {}}
				cancelTitleStyle={styles.searchBarCancelTitle}
				textInputStyle={styles.searchBarInput}
				borderRadius={Theme.radius.large}
			/>

			{Object.keys(groupedProjects).map((key, index) => (
				<View key={key}>
					<Spacer vertical={Theme.spacing.spacingS} />
					<TitleSectionHeader title={key} />

					<ProjectCardList
						projects={groupedProjects[key]}
						style={styles.defaultPadding}
						contentContainertStyle={styles.projectCardListContent}
						onPress={(project: Project) => navigation.navigate('ProjectOverview', { project })}
					/>
				</View>
			))}

			{filteredCollectibles.length > 0 && (
				<>
					<Spacer vertical={Theme.spacing.spacingS} />
					<TitleSectionHeader
						title="Collectibles & NFTs"
						// rightText="More"
						// rightTextOnPress={() => navigation.navigate('CategoryListings')}
					/>
					<CollectibleCardList
						items={filteredCollectibles}
						style={styles.defaultPadding}
						contentContainertStyle={styles.projectCardListContent}
					// onPress={(project: Project) => navigation.navigate('ProjectOverview', { project })}
					/>
				</>
			)}

			<Spacer vertical={Theme.spacing.spacing2XL} />
		</BaseLayout>
	);
};

const styles = StyleSheet.create({
	defaultPadding: {
		marginHorizontal: -Theme.spacing.spacingM
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
	projectCardListContent: {
		paddingHorizontal: Theme.spacing.spacingM,
		paddingVertical: Theme.spacing.spacingS
	},
});

export default Discover;
