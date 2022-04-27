import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { Theme } from 'styles/Index';
import { ArrowLeft } from 'react-native-feather';

interface Props {
	text?: string;
	color?: string;
	onPress: () => void;
	rightComponent?: JSX.Element;
}

const HeaderBackButton = (props: Props): JSX.Element => {
	const color = props.color ?? Theme.colors.black;
	const text = props.text ?? 'Back';

	return (
		<View style={styles.container}>
			<TouchableOpacity 
				style={styles.leftComponent} 
				onPress={() => props.onPress?.()}>
				<ArrowLeft
					width={22}
					height={22}
					stroke={color}
					strokeWidth={3}
				/>
				<Text style={[styles.text, { color }]}>{text}</Text>
			</TouchableOpacity>
			{props.rightComponent && (
				<View>
					{props.rightComponent}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between',
	},
	leftComponent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	text: {
		...Theme.typography.text.h5,
		marginLeft: Theme.spacing.spacing2XS, 
	}
});

export default HeaderBackButton;
