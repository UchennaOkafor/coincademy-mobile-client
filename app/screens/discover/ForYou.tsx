import { useNavigation } from '@react-navigation/native';
import ProjectPreviewCard from 'components/cards/ProjectPreviewCard';
import Header from 'components/headers/Header';
import BaseLayout from 'components/layout/BaseLayout';
import { StatusBar } from 'expo-status-bar';
import { getAuth } from 'firebase/auth';
import Project from 'models/Project';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Carousel from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CoinGeckoApiService from 'services/CoinGeckoApiService';
import { Theme } from 'styles/Index';
import { useQuery } from '@tanstack/react-query';

const ForYou = (): JSX.Element => {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const dimensions = useWindowDimensions();
	//const [projects, setProjects] = useState<Project[]>(require('@app/resources/projects.json'));
	const { data: projects } = useQuery(['coins'], async () => {
		return await CoinGeckoApiService.getTopCoins(8, "USD");
	});

	const [cardIndex, setCardIndex] = useState(0);
	
	return (
		<BaseLayout scrollable={false}>
			<StatusBar style="dark" translucent={true} />
			<Text style={styles.title}>Your Matches  🐣</Text>

			<View style={styles.carouselContainer}>
				<Carousel
					vertical={false}
					// ref={carousel}
					data={projects}
					renderItem={renderCarouselItem}
					sliderWidth={dimensions.width}
					itemWidth={dimensions.width}
					onScrollIndexChanged={(index: number) => setCardIndex(index)}
					useScrollView={false}
					loop={false}
				/>
			</View>

			<Pagination
				dotColor={Theme.colors.purpleLight}
				inactiveDotColor={Theme.colors.grayDark}
				activeDotIndex={cardIndex}
				dotsLength={projects?.length ?? 0}
			/>
		</BaseLayout>
	);

	// return (
	// 	<BaseLayout scrollable={false}>
	// 		<StatusBar style="dark" translucent={true} />
	// 		<Text style={styles.title}>Your Matches  🐣</Text>

	// 		<GestureHandlerRootView style={styles.carouselContainer}>
	// 			<Carousel
	// 				mode="parallax"
	// 				modeConfig={{
	// 					parallaxScrollingScale: 1,
	// 					parallaxScrollingOffset: 75,
	// 					parallaxAdjacentItemScale: Math.pow(0.7, 2)
	// 				}}
	// 				scrollAnimationDuration={600}
	// 				vertical={false}
	// 				data={projects}
	// 				renderItem={renderCarouselItem}
	// 				width={dimensions.width}
	// 				height={dimensions.height / 1.4}
	// 				loop={false}
	// 				style={{  }}
	// 				windowSize={4}
	// 				onSnapToItem={(index: number) => {
	// 					setCardIndex(index);
	// 				}}
	// 				// withAnimation={{
	// 				// 	type: 'spring',
	// 				// 	config: {
							
	// 				// 	}
	// 				// }}
	// 			/>
	// 		</GestureHandlerRootView>
	// 		<Pagination
	// 			dotColor={Theme.colors.purpleLight}
	// 			inactiveDotColor={Theme.colors.grayDark}
	// 			activeDotIndex={cardIndex} 
	// 			dotsLength={projects?.length ?? 0}			
	// 		/>
	// 	</BaseLayout>
	// );

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