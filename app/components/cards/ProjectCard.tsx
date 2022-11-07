import Spacer from 'components/common/Spacer';
import ToggleIcon from 'components/common/ToggleIcon';
import TouchableSurface from 'components/layout/TouchableSurface';
import Project from 'models/Project';
import React, { useState } from 'react';
import {
	StyleProp,
	StyleSheet,
	Text,
	View,
	ViewStyle,
	Image} from 'react-native';
import { TrendingDown, TrendingUp } from 'react-native-feather';
import { Theme } from 'styles/Index';

interface Props {
	project: Project;
	style?: StyleProp<ViewStyle>;
	onPress: () => void;
}

const ProjectCard = (props: Props): JSX.Element => {
	const [isLiked, setIsLiked] = useState(false);
	const TrendingIcon = 8 < 0 ? TrendingDown : TrendingUp;

	return (
		<View style={[styles.outerContainer, props.style]}>
			<TouchableSurface style={styles.container} onPress={props.onPress}>
				<View style={styles.topContentContainer}>
					<Image
						resizeMode="contain"
						source={{ uri: props.project.logoUrl}}
						style={styles.logo}
					/>
					{/* <ToggleIcon
						size={18}
						style={styles.heart}
						onChecked={(checked: boolean) => setIsLiked(checked)}
					/> */}
				</View>
				<Spacer vertical={Theme.spacing.spacing2XS} />
				<Text style={styles.name} numberOfLines={1}>
					{props.project.name}
				</Text>
				<Spacer vertical={Theme.spacing.spacing3XS} />
				<Text style={styles.description} numberOfLines={2}>
					{props.project.shortDescription}
				</Text>
				<Spacer vertical={Theme.spacing.spacing2XS} />
				{/* <View style={styles.trendIconContainer}>
					<TrendingIcon
						stroke={Theme.colors.green}
						fill={Theme.colors.transparent}
						width={18}
						height={18}
						style={styles.trendIcon}
					/>
					<Text style={[styles.trendText, { color: Theme.colors.green }]}>
						Trending
					</Text>
				</View> */}
			</TouchableSurface>
		</View>
	);
};

const styles = StyleSheet.create({
	outerContainer: {
		overflow: 'hidden',
		borderRadius: Theme.radius.large,
		width: 250
	},
	container: {
		paddingVertical: Theme.spacing.spacingM,
		paddingHorizontal: Theme.spacing.spacingL,
		backgroundColor: Theme.colors.white,
	},
	logo: {
		width: 40,
		height: 40,
		borderRadius: Theme.radius.normal,
	},
	name: {
		...Theme.typography.text.h6,
	},
	description: {
		...Theme.typography.text.h7,
		...Theme.typography.weight.normal,
		lineHeight: 19,
		color: Theme.colors.grayDark,
	},
	trendIconContainer: {
		flexDirection: 'row', 
		alignItems: 'center', 
		marginTop: 'auto'
	},
	trendText: {
		...Theme.typography.text.h8,
		...Theme.typography.weight.medium,
	},
	trendIcon: {
		marginRight: Theme.spacing.spacingXS
	},
	topContentContainer: {
		flexDirection: 'row', 
		alignItems: 'center'
	},
	heart: {
		marginLeft: 'auto'
	}
});

export default ProjectCard;