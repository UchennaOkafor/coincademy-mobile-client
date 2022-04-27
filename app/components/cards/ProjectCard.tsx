import RNBounceable from '@freakycoder/react-native-bounceable';
import Spacer from 'components/common/Spacer';
import Project from 'models/Project';
import React, { useState } from 'react';
import {
	StyleProp,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
	ViewStyle,
	Image} from 'react-native';
import { Heart, TrendingDown, TrendingUp } from 'react-native-feather';
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
		<View style={[styles.container, props.style]}>
			<TouchableNativeFeedback onPress={props.onPress}>
				<View style={styles.innerContainer}>
					<View style={styles.topContentContainer}>
						<Image
							resizeMode="contain"
							source={{ uri: props.project.imageUrl}}
							style={styles.logo}
						/>
						<RNBounceable
							style={styles.heart}
							bounceEffect={0.8}
							onPress={() => setIsLiked(!isLiked)}
							hitSlop={{ 
								top: Theme.spacing.spacingM, 
								bottom: Theme.spacing.spacingM, 
								left: Theme.spacing.spacingM, 
								right: Theme.spacing.spacingM
							}}>
							<Heart
								stroke={Theme.colors.red}
								fill={isLiked ? Theme.colors.red : Theme.colors.transparent}
								width={18}
								height={18}
								strokeWidth={2}
							/>
						</RNBounceable>
					</View>
					<>
						<Spacer vertical={Theme.spacing.spacing2XS} />
						<Text style={styles.name} numberOfLines={1}>
							{props.project.name}
						</Text>
						<Spacer vertical={Theme.spacing.spacing3XS} />
						<Text style={styles.description} numberOfLines={2}>
							{props.project.description}
						</Text>
					</>
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
				</View>
			</TouchableNativeFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.colors.white,
		borderRadius: Theme.radius.large,
		overflow: 'hidden',
		width: 250
	},
	innerContainer: {
		flex: 1,
		paddingVertical: Theme.spacing.spacingM,
		paddingHorizontal: Theme.spacing.spacingL,
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