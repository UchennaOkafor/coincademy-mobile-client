import Spacer from 'components/common/Spacer';
import Project from 'models/Project';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Theme } from 'styles/Index';
import { Entypo, FontAwesome, Fontisto } from '@expo/vector-icons';
import * as lodash from 'lodash';
import CoinGeckoApiService from 'services/CoinGeckoApiService';
import { useQuery } from "react-query";
import { URL } from 'react-native-url-polyfill';
import * as WebBrowser from 'expo-web-browser';

interface Props {
	project: Project;
}

const Overview = (props: Props) => {
	const dimensions = useWindowDimensions();
	const coin = useQuery(`coin_${props.project.id}`, async () => {
		return await CoinGeckoApiService.getCoinById(props.project.id)
	});

	return (
		<ScrollView 
			showsVerticalScrollIndicator={false} 
			style={styles.container}>
			<Text style={styles.subheading}>Description</Text>
			<Text style={styles.body}>
				{lodash.truncate(coin.data?.description, { length: 300 })}
			</Text>
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
			{/* <TouchableOpacity style={styles.socialLinkContainer}>
				<Fontisto 
					name="discord" 
					size={22}
					color="#5865F2" 
					style={styles.socialLinkIcon} 
				/>
				<Text style={styles.socialLinkText}>Discord</Text>
			</TouchableOpacity> */}
			<TouchableOpacity style={styles.socialLinkContainer} onPress={() => WebBrowser.openBrowserAsync(coin.data?.links.reddit.link)}>
				<FontAwesome 
					name="reddit" 
					size={22} 
					color="#FF4500" 
					style={styles.socialLinkIcon} 
				/>
				<Text style={styles.socialLinkText}>r/{coin.data?.links.reddit.label}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.socialLinkContainer} onPress={() => WebBrowser.openBrowserAsync(coin.data?.links.twitter.link)}>
				<Entypo 
					name="twitter-with-circle" 
					size={22} 
					color="#1DA1F2" 
					style={styles.socialLinkIcon} 
				/>
				<Text style={styles.socialLinkText}>@{coin.data?.links.twitter.label}</Text>
			</TouchableOpacity>
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
