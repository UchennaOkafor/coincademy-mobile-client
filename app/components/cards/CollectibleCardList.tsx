import Project from 'models/Project';
import React from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Theme } from 'styles/Index';
import CollectibleCard from './CollectibleCard';

interface Props {
	items: Project[];
	style?: StyleProp<ViewStyle>;
	contentContainertStyle?: StyleProp<ViewStyle>;
	loading?: boolean;
	loadingComponent?: JSX.Element;
	emptyComponent?: JSX.Element;
	onPress: (project: Project) => void;
}

const CollectibleCardList = (props: Props): JSX.Element => {
	return (
		<View style={props.style}>
			{props.loading ? (
				props.loadingComponent
			) : (
				<>
					{props.items == null || props.items.length === 0 ? (
						props.emptyComponent
					) : (
						<>
							<ScrollView
								horizontal={true}
								contentContainerStyle={props.contentContainertStyle}
								showsHorizontalScrollIndicator={false}>
								{props.items.map((item: Project, index: number) => {
									const isLastItem = index === props.items.length;
									const cardStyle: StyleProp<ViewStyle> = { 
										marginRight: isLastItem ? 0 : Theme.spacing.spacingM 
									};

									return (
										<CollectibleCard
											key={item.id}
											item={item}
											onPress={() => props.onPress?.(item)}
											style={cardStyle}
										/>
									);
								})}
							</ScrollView>
						</>
					)}
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({});

export default CollectibleCardList;