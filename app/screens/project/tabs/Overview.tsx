import Spacer from 'components/common/Spacer';
import Project from 'models/Project';
import React, {  } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Theme } from 'styles/Index';
import { Entypo, FontAwesome, Fontisto } from '@expo/vector-icons';

interface Props {
	project: Project;
}

const Overview = (props: Props) => {
	return (
		<ScrollView 
			showsVerticalScrollIndicator={false} 
			style={styles.container}>
			<Text style={styles.subheading}>Description</Text>
			<Text style={styles.body}>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry.
				Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
				when an unknown printer took a galley of type and scrambled it to make a type specimen book.
			</Text>

			<Spacer />

			<Text style={styles.subheading}>Links</Text>
			<View style={styles.socialLinkContainer}>
				<Entypo 
					name="link" 
					size={21} 
					color={Theme.colors.grayDark900}
					style={styles.socialLinkIcon}
					/>
				<Text style={styles.socialLinkText}>website.com</Text>
			</View>
			<View style={styles.socialLinkContainer}>
				<Fontisto 
					name="telegram" 
					size={22} 
					color="#229ED9" 
					style={styles.socialLinkIcon} 
					/>
				<Text style={styles.socialLinkText}>Telegram</Text>
			</View>
			<View style={styles.socialLinkContainer}>
				<Fontisto 
					name="discord" 
					size={22}
					color="#5865F2" 
					style={styles.socialLinkIcon} 
				/>
				<Text style={styles.socialLinkText}>Discord</Text>
			</View>
			<View style={styles.socialLinkContainer}>
				<FontAwesome 
					name="reddit" 
					size={22} 
					color="#FF4500" 
					style={styles.socialLinkIcon} 
				/>
				<Text style={styles.socialLinkText}>r/wsb</Text>
			</View>
			<View style={styles.socialLinkContainer}>
				<Entypo 
					name="twitter-with-circle" 
					size={22} 
					color="#1DA1F2" 
					style={styles.socialLinkIcon} 
				/>
				<Text style={styles.socialLinkText}>@username</Text>
			</View>
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
