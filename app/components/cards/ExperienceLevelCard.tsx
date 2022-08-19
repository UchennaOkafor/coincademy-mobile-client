import React, { memo, useState } from 'react';
import {
	StyleProp,
	StyleSheet,
	Text,
	ViewStyle
} from 'react-native';
import equals from 'react-fast-compare';
import { Theme } from 'styles/Index';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { CheckCircle } from 'react-native-feather';

interface Props {
	active: boolean;
	emoji: string;
	name: string;
	onPress: (name: string) => void;
}

const ExperienceLevelCard = (props: Props): JSX.Element => {
	const activeStyle: StyleProp<ViewStyle> = {
		borderColor: props.active ? Theme.colors.blue : Theme.colors.transparent
	};
	
	return (
		<RNBounceable
			bounceEffectIn={1.04}
			bounceEffectOut={1}
			style={[styles.container, activeStyle]}
			onPress={() => {
				props.onPress?.(props.name);
			}}>

			<Text style={styles.emoji}>{props.emoji}</Text>
			<Text style={styles.name}>{props.name}</Text>

			<CheckCircle
				stroke={Theme.colors.white}
				fill={Theme.colors.blue}
				strokeWidth={2.5}
				width={26}
				height={26}
				style={[styles.checkCircle, { opacity: props.active ? 1 : 0 }]}
			/>
		</RNBounceable>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: Theme.spacing.spacingXS, 
		paddingHorizontal: Theme.spacing.spacingL, 
		backgroundColor: Theme.colors.white, 
		borderRadius: Theme.radius.large,
		borderWidth: 1.5
	},
	emoji: {
		...Theme.typography.text.h1,
		marginRight: Theme.spacing.spacingM,
	},
	name: {
		...Theme.typography.text.h6, 
		...Theme.typography.weight.medium,
	},
	checkCircle: {
		marginLeft: 'auto'
	}
});

export default memo(ExperienceLevelCard, equals);
