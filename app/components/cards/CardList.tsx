import Project from 'models/Project';
import React, { useCallback } from 'react';
import { FlatList, RefreshControlProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Theme } from 'styles/Index';
import Card from './Card';

interface Props {
	projects: Project[];
	style?: StyleProp<ViewStyle>;
	loading?: boolean;
	loadingComponent?: JSX.Element;
	emptyComponent?: JSX.Element;
	onPress: (project: Project) => void;
	contentContainerStyle?: StyleProp<ViewStyle>;
	headerComponent?: React.ComponentType<any> | React.ReactElement | null;
	footerComponent?: React.ComponentType<any> | React.ReactElement | null;
	refreshControl?: React.ReactElement<RefreshControlProps>;
}

const CardList = (props: Props): JSX.Element => {
	const keyExtractor = useCallback((item: Project) => item.id, []);
	const renderItem = useCallback(
		({ item }: { item: Project }) => (
			<Card
				name={item.name}
				imageUrl={item.imageUrl}
				subtitle={item.description}
				onPress={() => props.onPress?.(item)}
			/>
		),
		[props.onPress]
	);

	return (
		<View style={props.style}>
			{props.loading ? (
				props.loadingComponent
			) : (
				<>
						{props.projects == null || props.projects.length === 0 ? (
						props.emptyComponent
					) : (
							<FlatList
								data={props.projects}
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{ }}
								ItemSeparatorComponent={() => (
									<View style={styles.itemPadding} />
								)}
								renderItem={renderItem}
								keyExtractor={keyExtractor}
								refreshControl={props.refreshControl}
								ListHeaderComponent={props.headerComponent}
								ListFooterComponent={props.footerComponent}
							/>
					)}
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	itemPadding: {
		marginBottom: Theme.spacing.spacingM
	}
});

export default CardList;