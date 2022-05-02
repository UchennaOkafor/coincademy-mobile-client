import React, {  } from 'react';
import {
	StyleSheet,
	Text,
	View} from 'react-native';
import { Theme } from 'styles/Index';

interface Props {
	text: string;
}

const Chip = (props: Props): JSX.Element => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{props.text}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: Theme.spacing.spacing2XS, 
		marginRight: Theme.spacing.spacingXS, 
		paddingVertical: Theme.spacing.spacing2XS, 
		paddingHorizontal: Theme.spacing.spacingXS,
		borderRadius: Theme.radius.large, 
		backgroundColor: Theme.colors.backgroundGray
	},
	text: {
		...Theme.typography.text.h8, 
		...Theme.typography.weight.medium,
		color: Theme.colors.gray,
		textAlign: 'left'
	}
});

export default Chip;
