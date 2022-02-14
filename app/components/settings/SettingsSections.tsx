import React, { memo } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	TouchableOpacity,
	Text
} from 'react-native';
import equals from 'react-fast-compare';
import { Theme } from 'styles/Index';
import Divider from 'components/common/Divider';
import Spacer from 'components/common/Spacer';
import { SettingsSections } from 'resources/SettingsListData';

interface Props {
	sections: SettingsSections[];
	onItemPressed: (id: string) => void;
}

const CourseList = (props: Props): JSX.Element => {
	return (
		<ScrollView>
			{props.sections.map((item: SettingsSections) => {
				return (
					<View key={item.title}>
						<Text style={styles.heading}>{item.title.toUpperCase()}</Text>
						<Spacer vertical={Theme.spacing.spacingXS} />
						<Divider />
						{item.items.map((item) => {
							const Icon = item.icon;

							return (
								<TouchableOpacity
									key={item.title}
									style={styles.itemContainer}
									onPress={() => props.onItemPressed(item.id)}>
									<Icon
										stroke={item.color}
										width={22}
										height={22}
										style={styles.icon}
									/>
									<Text style={[styles.text, {color: item.color}]}>{item.title}</Text>
								</TouchableOpacity>
							)
						})}
						<Spacer vertical={Theme.spacing.spacingL} />
					</View>
				)
			})}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	sectionHeader: {
		marginTop: Theme.spacing.spacingM,
		marginBottom: Theme.spacing.spacingS
	},
	heading: {
		...Theme.typography.text.h6, 
		...Theme.typography.weight.medium, 
		color: Theme.colors.grayDark900, 
		textAlign: 'left'
	},
	lessonCard: {
		marginBottom: Theme.spacing.spacingXS + Theme.spacing.spacing3XS
	},
	itemContainer: {
		marginTop: Theme.spacing.spacingM + Theme.spacing.spacing3XS, 
		flexDirection: 'row', 
		alignItems: 'center'
	},
	icon: {
		marginRight: Theme.spacing.spacingM
	},
	text: {
		...Theme.typography.text.h6, 
		...Theme.typography.weight.normal, 
	}
});

export default memo(CourseList, equals);