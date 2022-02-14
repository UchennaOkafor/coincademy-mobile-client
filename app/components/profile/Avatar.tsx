import React from 'react';
import { View, Text, Image, StyleSheet, StyleProp, ImageStyle } from 'react-native';
import { Theme } from 'styles/Index';

interface Props {
	url?: string;
	initials?: string;
	size: number;
}

const Avatar = (props: Props): JSX.Element => {
	const avatarStyle: StyleProp<ImageStyle> = {
		width: props.size, 
		height: props.size,
		borderRadius: props.size / 2
	};

	return (
		<>
			{props.url ? (
				<Image
					source={{ uri: props.url }}
					style={avatarStyle}
				/>
			) : (
				<View
						style={[styles.initialsContainer, avatarStyle]}>
					<Text style={styles.initialsText}>{props.initials}</Text>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	initialsContainer: {
		justifyContent: 'center', 
		alignItems: 'center', 
		borderWidth: 2,
		borderStyle: 'dashed', 
		borderColor: Theme.colors.purple
	},
	initialsText: {
		...Theme.typography.text.h3
	}
});

export default Avatar;
