import React, { memo } from 'react';
import { StyleProp, StyleSheet,Text, View, ViewStyle} from 'react-native';
import equals from 'react-fast-compare';
import { Theme } from 'styles/Index';

interface Props {
	text: string;
	style?: StyleProp<ViewStyle>
}

const Pill = (props: Props): JSX.Element => {
	return (
		<View style={[styles.container, props.style]}>
			<Text style={styles.text}>{props.text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: Theme.spacing.spacing2XS, 
		paddingHorizontal: Theme.spacing.spacingS, 
		backgroundColor: Theme.colors.white, 
		borderRadius: Theme.radius.large,
	},
	text: {
		...Theme.typography.text.h7, 
		...Theme.typography.weight.normal,
	}
});

export default memo(Pill, equals);