import React, { memo } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	ViewStyle,
	StyleProp} from 'react-native';
import equals from 'react-fast-compare';
import TouchableSurface from 'components/layout/TouchableSurface';
import { Theme } from 'styles/Index';
import Project from 'models/Project';
import Spacer from 'components/common/Spacer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
	item: Project;
	onPress: () => void;
	style: StyleProp<ViewStyle>
}

const CollectibleCard = (props: Props): JSX.Element => {
	return (
		<View style={[styles.container, props.style]}>
			<TouchableSurface disabled={false} onPress={props.onPress}>
				<View style={styles.innerContainer}>
					<Image
						resizeMode="cover"
						source={{ uri: props.item.imageUrl }}
						style={styles.image}
					/>
					<View style={styles.contentContainer}>
						<Text style={styles.title} numberOfLines={1}>
							{props.item.name}
						</Text>
						<Spacer vertical={Theme.spacing.spacing3XS} />
						<View style={styles.footerContainer}>
							<MaterialCommunityIcons 
								name="ethereum" 
								size={16} 
								color={Theme.colors.black}
								style={styles.ethIcon}
							/>
							<Spacer vertical={0} horizontal={Theme.spacing.spacing3XS} />
							<Text style={styles.subtitle} numberOfLines={1}>
								3.5 ETH
							</Text>
						</View>
					</View>
				</View>
			</TouchableSurface>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...Theme.shadows.small,
		overflow: 'hidden',
		borderRadius: Theme.radius.large,
	},
	innerContainer: {
		width: 160,
		backgroundColor: Theme.colors.white,
		// padding: Theme.spacing.spacingXS + Theme.spacing.spacing3XS,
	},
	image: {
		height: 140,
	},
	title: {
		...Theme.typography.text.h7,
		color: Theme.colors.black,
		textAlign: 'left',
	},
	subtitle: {
		...Theme.typography.text.h7,
		color: Theme.colors.grayDark,
		textAlign: 'left',
	},
	contentContainer: {
		paddingVertical: Theme.spacing.spacingXS + Theme.spacing.spacing3XS,
		paddingHorizontal: Theme.spacing.spacingS,
	},
	footerContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	ethIcon: {
		marginLeft: -Theme.spacing.spacing3XS
	}
});

export default memo(CollectibleCard, equals);
