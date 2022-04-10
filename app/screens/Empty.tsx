import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Theme } from 'styles/Index';

const Empty = (): JSX.Element => {
	return (
		<View style={styles.container}>
			<Text>Empty</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: Theme.spacing.spacingM,
		paddingTop: Theme.spacing.spacing2XS,
		backgroundColor: Theme.colors.backgroundGray
	},
});

export default Empty;
