import { useNavigation } from '@react-navigation/native';
import ProjectPreviewCard from 'components/cards/ProjectPreviewCard';
import Header from 'components/headers/Header';
import BaseLayout from 'components/layout/BaseLayout';
import { getAuth } from 'firebase/auth';
import Project from 'models/Project';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, useWindowDimensions, View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { default as ReanimatedCarousel } from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CoinGeckoApiService from 'services/CoinGeckoApiService';
import { Theme } from 'styles/Index';
import { useQuery } from '@tanstack/react-query';

const Home = (): JSX.Element => {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const dimensions = useWindowDimensions();
	//const [projects, setProjects] = useState<Project[]>(require('@app/resources/projects.json'));
	const projectQuery = useQuery(['coins'], async () => {
		return await CoinGeckoApiService.getTopCoins(15, 'USD');
	});

	const [cardIndex, setCardIndex] = useState(0);

	const renderCarouselItem = useCallback(({ item }: { item: Project }) => {
		return (
			<View onLayout={(e) => { console.log(e.nativeEvent.layout.height) }}>
				<ProjectPreviewCard
					key={item.id}
					project={item}
					onPress={() => navigation.navigate('ProjectOverview', { project: item })}
					style={styles.cardItem}
				/>
			</View>
		);
	}, []);
	
	return (
		<BaseLayout scrollable={false}>
			<Header
				title="For You 🐣"
				user={getAuth().currentUser}
				onProfilePress={() => navigation.navigate('Profile')}
				onSettingsPress={() => navigation.navigate('Settings')}
			/>
			<View style={styles.carouselContainer}>
				{projectQuery.isLoading ? (
					<ActivityIndicator 
						color={Theme.colors.purple}
						style={styles.loadingIndicator}
					/>
				) : (
					<>
						{/* <Carousel
							vertical={false}
							// ref={carousel}
							data={projectQuery.data}
							renderItem={renderCarouselItem2}
							sliderWidth={dimensions.width}
							itemWidth={dimensions.width}
							onScrollIndexChanged={(index: number) => setCardIndex(index)}
							useScrollView={true}
							loop={false}
							layout="stack"
							layoutCardOffset={4}
						/> */}

							<GestureHandlerRootView>
								<ReanimatedCarousel
									mode="horizontal-stack"
									modeConfig={{
										showLength: 5,
										// parallaxScrollingScale: 1,
										// parallaxScrollingOffset: 75,
										// parallaxAdjacentItemScale: Math.pow(0.7, 2)
									}}
									// scrollAnimationDuration={500}
									vertical={false}
									data={projectQuery.data}
									renderItem={renderCarouselItem}
									width={dimensions.width - Theme.spacing.spacingM}
									height={374 + Theme.spacing.spacingM}
									loop={false}
									windowSize={4}
									// style={{ borderWidth: 1 }}
									// onSnapToItem={(index: number) => {
									// 	setCardIndex(index);
									// }}
									onScrollEnd={(index: number) => {
										setCardIndex(index);
									}}
								// withAnimation={{
								// 	type: 'spring',
								// 	config: {

								// 	}
								// }}
								/>
							</GestureHandlerRootView>

						<Pagination
							dotColor={Theme.colors.purpleLight}
							inactiveDotColor={Theme.colors.grayDark}
							activeDotIndex={cardIndex}
							dotsLength={projectQuery.data?.length ?? 0}
						/>
					</>
				)}
			</View>
		</BaseLayout>
	);
};

const styles = StyleSheet.create({
	carouselContainer: {
		marginTop: Theme.spacing.spacingM,
		marginHorizontal: -Theme.spacing.spacingM
	},
	cardItem: {
		marginHorizontal: Theme.spacing.spacingM, 
		marginTop: Theme.spacing.spacingS
	},
	loadingIndicator: {
		marginTop: Theme.spacing.spacing3XL
	}
});

export default Home;