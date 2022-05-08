import React, { memo } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image} from 'react-native';
import equals from 'react-fast-compare';
import TouchableSurface from 'components/layout/TouchableSurface';
import { Theme } from 'styles/Index';
import { Triangle } from 'react-native-feather';

interface Props {
	name: string;
	subtitle: string;
	imageUrl: string;
	onPress: () => void;
}

const Card = (props: Props): JSX.Element => {
	return (
		<View style={styles.container}>
			<TouchableSurface
				style={styles.innerContainer}
				disabled={false} 
				onPress={props.onPress}>
				<View style={styles.image}>
					<Image
						resizeMode="center"
						source={{uri: props.imageUrl}}
						style={styles.image}
					/>
				</View>
				<View style={styles.contentContainer}>
					<Text style={styles.title} numberOfLines={1}>
						{props.name}
					</Text>
					<View style={styles.innerContentContainer}>
						<Text style={styles.subtitle} numberOfLines={1}>
							{props.subtitle}
						</Text>
					</View>
				</View>
				<View style={styles.stats}>
					<Triangle
						width={16}
						height={16}
						stroke={Theme.colors.gray}
						strokeWidth={3}
					/>
					<Text>0</Text>
				</View>
			</TouchableSurface>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
		...Theme.shadows.small,
		borderRadius: Theme.radius.large,
	},
	innerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: Theme.spacing.spacingM,
		paddingVertical: Theme.spacing.spacingS,
		backgroundColor: Theme.colors.white
	},
	contentContainer: {
		flex: 1
	},
	innerContentContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: Theme.spacing.spacing2XS,
		marginHorizontal: Theme.spacing.spacingM
	},
	image: {
		width: 35,
		height: 35,
		borderRadius: Theme.radius.large,
	},
	title: {
		...Theme.typography.text.h7,
		marginHorizontal: Theme.spacing.spacingM,
		textAlign: 'left',
		flexWrap: 'wrap'
	},
	subtitle: {
		...Theme.typography.text.h7,
		...Theme.typography.weight.normal,
		color: Theme.colors.grayDark,
		textAlign: 'left'
	},
	stats: {
		alignItems: 'center', 
		marginLeft: 'auto'
	}
});

export default memo(Card, equals);
