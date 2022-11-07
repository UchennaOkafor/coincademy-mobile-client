import Spacer from 'components/common/Spacer';
import Project from 'models/Project';
import React from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Theme } from 'styles/Index';
import { Entypo, FontAwesome, Fontisto } from '@expo/vector-icons';
import CoinGeckoApiService from 'services/CoinGeckoApiService';
import { useQuery } from "@tanstack/react-query";
import * as WebBrowser from 'expo-web-browser';
import RenderHtml from 'react-native-render-html';

interface Props {
	project: Project;
}

const Overview = (props: Props) => {
	const dimensions = useWindowDimensions();
	const coin = useQuery([`coin_${props.project.id}`], async () => {
		return await CoinGeckoApiService.getCoinById(props.project.id)
	});

	return (
		<ScrollView 
			showsVerticalScrollIndicator={false} 
			style={styles.container}>
			<Text style={styles.subheading}>Description</Text>
			
			<RenderHtml
				baseStyle={styles.body}
				contentWidth={dimensions.width}
				source={{ html: coin.data?.description ?? '' }}
				defaultTextProps={{ numberOfLines: 4 }}
			/>

			<Spacer />
			<Text style={styles.subheading}>Links</Text>
			<TouchableOpacity style={styles.socialLinkContainer} onPress={() => WebBrowser.openBrowserAsync(coin.data?.links.website.link)}>
				<Entypo 
					name="link" 
					size={21} 
					color={Theme.colors.grayDark900}
					style={styles.socialLinkIcon}
					/>
				<Text style={styles.socialLinkText}>{coin.data?.links.website.label}</Text>
			</TouchableOpacity>
			{coin.data?.links.discord != '' && (
				<TouchableOpacity style={styles.socialLinkContainer} onPress={() => WebBrowser.openBrowserAsync(coin.data?.links.discord)}>
					<Fontisto
						name="discord"
						size={22}
						color="#5865F2"
						style={styles.socialLinkIcon}
					/>
					<Text style={styles.socialLinkText}>Discord</Text>
				</TouchableOpacity>
			)}
			{coin.data?.links.reddit.label !== '' && (
				<TouchableOpacity style={styles.socialLinkContainer} onPress={() => WebBrowser.openBrowserAsync(coin.data?.links.reddit.link)}>
					<FontAwesome
						name="reddit"
						size={22}
						color="#FF4500"
						style={styles.socialLinkIcon}
					/>
					<Text style={styles.socialLinkText}>r/{coin.data?.links.reddit.label}</Text>
				</TouchableOpacity>
			)}
			{coin.data?.links.twitter.label !== '' && (
				<TouchableOpacity style={styles.socialLinkContainer} onPress={() => WebBrowser.openBrowserAsync(coin.data?.links.twitter.link)}>
					<Entypo
						name="twitter-with-circle"
						size={22}
						color="#1DA1F2"
						style={styles.socialLinkIcon}
					/>
					<Text style={styles.socialLinkText}>@{coin.data?.links.twitter.label}</Text>
				</TouchableOpacity>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Theme.colors.transparent,
		padding: Theme.spacing.spacingM,
	},
	subheading: {
		...Theme.typography.text.h6, 
		marginBottom: Theme.spacing.spacing2XS
	},
	body: {
		...Theme.typography.text.body2
	},
	socialLinkContainer: {
		flexDirection: 'row', 
		alignItems: 'center', 
		marginBottom: Theme.spacing.spacingS
	},
	socialLinkIcon: {
		width: 32
	},
	socialLinkText: {
		...Theme.typography.text.h7, 
		...Theme.typography.weight.medium, 
		color: Theme.colors.grayDark
	}
});

export default Overview;
