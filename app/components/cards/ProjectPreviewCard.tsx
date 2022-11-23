import React, { memo, useRef, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	ViewStyle,
	StyleProp,
	TouchableWithoutFeedback} from 'react-native';
import { Theme } from 'styles/Index';
import { ChevronRight } from 'react-native-feather';
import Divider from 'components/common/Divider';
import Chip from 'components/chips/Chip';
import ToggleIcon, { ToggleIconRef } from 'components/common/ToggleIcon';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import Project from 'models/Project';
import PriceUtility from 'utility/PriceUtility';
import equals from 'react-fast-compare';

interface Props {
	project: Project;
	onPress: () => void;
	style: StyleProp<ViewStyle>;
}

const ProjectPreviewCard = (props: Props): JSX.Element => {
	const sortedCategories = props.project.categories.sort((a: string, b: string) => a.length - b.length);
	const toggleIcon = useRef<ToggleIconRef>(null);
	const [liked, setLiked] = useState(false);

	const toggleHandler = () => {
		toggleIcon.current?.toggle();
	}

	const handleOnPress = () => {
		props.onPress?.();
	}

	const doubleTap = Gesture.Tap()
		.numberOfTaps(2)
		.onStart((e) => {
			runOnJS(toggleHandler)();
		});

	const singleTap = Gesture.Tap()
		.numberOfTaps(1)
		.onStart((e) => {
			runOnJS(handleOnPress)();
		});

	return (
		<GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
			<View style={[styles.container, props.style]}>
				<TouchableWithoutFeedback>
					<View style={styles.innerContainer}>
						<ToggleIcon
							ref={toggleIcon}
							initialValue={liked}
							size={20}
							style={styles.loveHeart}
							onChecked={(checked: boolean) => { }}
						/>
						<View style={styles.header}>
							<Image
								resizeMode="contain"
								source={{ uri: props.project.fullLogoUrl }}
								style={styles.logoImage}
							/>
							<Text style={styles.shortDescription} numberOfLines={2}>
								{props.project.name}
							</Text>
							<Text style={styles.tags}>
								{props.project.tags.map((value, index, tags) => `${value}${index === tags.length - 1 ? '' : '  ·  '}`)}
							</Text>
						</View>

						<SectionTitle title="Categories" />
						<View style={styles.chipContainer}>
							{sortedCategories.map((value: string) => (
								<Chip key={value} text={value} />
							))}
						</View>

						{props.project.type === 'project' && (
							<>
								<SectionTitle title="Company" />
								<Text style={styles.smallText}>🌱  Pre-Seed</Text>
								<Text style={styles.smallText}>💵  $1.5M total funding</Text>
								<Text style={styles.smallText}>💰  $29.5T valuation</Text>
							</>
						)}

						{(props.project.type === 'coin' || props.project.type === 'token') && (
							<>
								<SectionTitle title="Tokenomics" />
								{/* <BulletedPoint text="Token: Utility" /> */}
								<BulletedPoint text={`Market Cap: ${PriceUtility.formatMarketCap(props.project.marketCap, { currency: "USD", locale: "en-US" })}`} />
								{/* <BulletedPoint text="Circulating Supply: 19 Million BTC" /> */}
							</>
						)}
					</View>
				</TouchableWithoutFeedback>
			</View>
		</GestureDetector>
	);

	function SectionTitle({title}: {title: string}): JSX.Element {
		return (
			<>
				<View style={styles.sectionDivider}>
					<Divider />
				</View>
				<Text style={styles.sectionTitle}>{title}</Text>
			</>
		)
	}
	
	function BulletedPoint({ text }: { text: string }): JSX.Element {
		return (
			<View style={styles.row}>
				<ChevronRight
					width={16}
					height={16}
					strokeWidth={3}
					color={Theme.colors.blue}
					style={styles.bulletIcon}
				/>
				<Text style={styles.smallText}>
					{text}
				</Text>
			</View>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		...Theme.shadows.small,
	},
	innerContainer: {
		borderRadius: Theme.radius.large,
		padding: Theme.spacing.spacingXL,
		backgroundColor: Theme.colors.white
	},
	header: {
		marginTop: Theme.spacing.spacing2XS + Theme.spacing.spacing3XS, 
		marginBottom: Theme.spacing.spacing3XS,
		alignItems: 'center'
	},
	loveHeart: {
		zIndex: 1,
		position: 'absolute',
		right: 25,
		top: 25
	},
	logoImage: {
		height: 70,
		width: '70%',
	},
	shortDescription: {
		...Theme.typography.text.h5,
		...Theme.typography.weight.semiBold,
		textAlign: 'center',
		flexWrap: 'wrap',
		marginHorizontal: Theme.spacing.spacing2XS,
		marginVertical: Theme.spacing.spacingM,
	},
	tags: {
		...Theme.typography.text.h7,
		...Theme.typography.weight.medium,
		color: Theme.colors.grayDark,
		textAlign: 'center',
		lineHeight: 21.5,
	},
	sectionDivider: {
		marginTop: Theme.spacing.spacingM, 
		marginBottom: Theme.spacing.spacingS
	},
	sectionTitle: {
		...Theme.typography.text.h6, 
		...Theme.typography.weight.medium, 
		marginBottom: Theme.spacing.spacingXS, 
		textAlign: 'left',
	},
	chipContainer: {
		flexWrap: 'wrap', 
		flexDirection: 'row'
	},
	row: {
		flexDirection: 'row',
	},
	smallText: {
		...Theme.typography.text.h7, 
		...Theme.typography.weight.normal, 
		color: Theme.colors.grayDark, 
		marginBottom: Theme.spacing.spacing2XS, 
	},
	bulletIcon: {
		marginRight: Theme.spacing.spacing2XS
	}
});

export default memo(ProjectPreviewCard, equals);