import { useNavigation } from '@react-navigation/native';
import ProjectPreviewCard from 'components/cards/ProjectPreviewCard';
import Header from 'components/headers/Header';
import BaseLayout from 'components/layout/BaseLayout';
import { StatusBar } from 'expo-status-bar';
import { getAuth } from 'firebase/auth';
import Project from 'models/Project';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pagination } from 'react-native-snap-carousel';
import CoinGeckoApiService from 'services/CoinGeckoApiService';
import { Theme } from 'styles/Index';

const ForYou = (): JSX.Element => {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const dimensions = useWindowDimensions();
	//const [projects, setProjects] = useState<Project[]>(require('@app/resources/projects.json'));
	const [projects, setProjects] = useState<Project[]>([]);

	const initialize = useCallback(async () => {
		const coins = await CoinGeckoApiService.getTopCoins(30, "USD");
		setProjects(coins);
	}, []);

	useEffect(() => {
		initialize();
	}, []);
	
	return (
		<BaseLayout scrollable={false}>
			<StatusBar style="dark" translucent={true} />
			<Header
				user={getAuth().currentUser}
				onProfilePress={() => navigation.navigate('Profile')}
				onSettingsPress={() => navigation.navigate('Settings')}
			/>
			
			<Text style={styles.title}>Your Matches</Text>

			<GestureHandlerRootView style={styles.carouselContainer}>
				<Carousel
					mode="parallax"
					modeConfig={{
						parallaxScrollingScale: 1,
						parallaxScrollingOffset: 75,
						parallaxAdjacentItemScale: Math.pow(0.7, 2)
					}}
					scrollAnimationDuration={600}
					vertical={false}
					data={projects}
					renderItem={renderCarouselItem}
					width={dimensions.width}
					height={dimensions.height / 1.4}
					loop={false}
					style={{  }}
					// withAnimation={{
					// 	type: 'spring',
					// 	config: {
							
					// 	}
					// }}
				/>
			</GestureHandlerRootView>
			<Pagination 
				activeDotIndex={0} 
				dotsLength={0}			
			/>
		</BaseLayout>
	);

	function renderCarouselItem({ item }: { item: Project }): JSX.Element {
		return (
			<ProjectPreviewCard
				key={item.id}
				project={item}
				onPress={() => navigation.navigate('ProjectOverview', { project: item })}
				style={styles.cardItem}
			/>
		);
	}
};

const styles = StyleSheet.create({
	carouselContainer: {
		marginHorizontal: -Theme.spacing.spacingM
	},
	title: {
		...Theme.typography.text.h3,
		...Theme.typography.weight.extraBold,
		marginVertical: Theme.spacing.spacing2XS
	},
	cardItem: {
		marginHorizontal: Theme.spacing.spacingM, 
		marginTop: Theme.spacing.spacingS
	}
});

export default ForYou;
