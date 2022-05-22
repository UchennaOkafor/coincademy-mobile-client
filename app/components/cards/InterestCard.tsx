import React, { memo, useState } from 'react';
import {
	StyleProp,
	StyleSheet,
	Text,
	View,
	ViewStyle} from 'react-native';
import equals from 'react-fast-compare';
import { Theme } from 'styles/Index';
import Spacer from 'components/common/Spacer';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { CheckCircle } from 'react-native-feather';

interface Props {
	emoji: string;
	name: string;
	onPress: (name: string) => void;
}

const InterestCard = (props: Props): JSX.Element => {
	const [active, setActive] = useState(false);
	const activeStyle: StyleProp<ViewStyle> = {
		borderColor: active ? Theme.colors.blue : Theme.colors.transparent
	}
	
	return (
		<RNBounceable
			bounceEffect={0.97} 
			bounceFriction={5}
			style={[styles.container, activeStyle]}
			onPress={() => {
				props.onPress?.(props.name);
				setActive(!active);
			}}>

			<Text style={styles.emoji}>{props.emoji}</Text>
			<Spacer vertical={Theme.spacing.spacing3XS} />
			<View style={styles.nameContainer}>
				<Text style={styles.name}>{props.name}</Text>
				<CheckCircle
					stroke={Theme.colors.white}
					fill={Theme.colors.blue}
					strokeWidth={3}
					width={22}
					height={22}
					style={{ opacity: active ? 1 : 0 }}
				/>
			</View>
		</RNBounceable>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: Theme.spacing.spacingS, 
		backgroundColor: Theme.colors.white, 
		borderRadius: Theme.radius.large,
		borderWidth: 1.5,
	},
	emoji: {
		...Theme.typography.text.h5
	},
	name: {
		flex: 1,
		...Theme.typography.text.h6, 
		...Theme.typography.weight.medium,
		marginRight: Theme.spacing.spacing2XS
	},
	nameContainer: {
		flexDirection: 'row',
		alignItems: 'center', 
		justifyContent: 'space-between'
	}
});

export default memo(InterestCard, equals);
