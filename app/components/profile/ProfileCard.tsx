import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock } from 'react-native-feather';
import { Theme } from 'styles/Index';
import Avatar from './Avatar';

interface Props {

}

const ProfileCard = (props: Props): JSX.Element => {
	return (
		<View style={styles.profileContainer}>
			<View>
				<Text style={styles.name}>Timmy Thick</Text>
				<View style={styles.joinedContainer}>
					<Clock
						stroke={Theme.colors.grayDark}
						fill={Theme.colors.transparent}
						width={16}
						height={16}
					/>
					<Text style={styles.joinedText}>Joined Yesterday</Text>
				</View>
			</View>
			<Avatar
				url="https://styles.redditmedia.com/t5_2th52/styles/communityIcon_wzrl8s0hx8a81.png"
				initials="UO"
				size={50}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	profileContainer: {
		marginTop: Theme.spacing.spacing2XS,
		marginBottom: Theme.spacing.spacingM,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	name: {
		...Theme.typography.text.h3 
	},
	joinedContainer: {
		flexDirection: 'row', 
		alignItems: 'center', 
		marginTop: Theme.spacing.spacingXS
	},
	joinedText: {
		...Theme.typography.text.h7, 
		...Theme.typography.weight.medium, 
		color: Theme.colors.grayDark,
		marginLeft: Theme.spacing.spacingXS
	}
});

export default ProfileCard;
