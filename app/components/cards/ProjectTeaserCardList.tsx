import Project from 'models/Project';
import React from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Theme } from 'styles/Index';
import ProjectTeaserCard from './ProjectTeaserCard';

interface Props {
	items: Project[];
	style?: StyleProp<ViewStyle>;
	contentContainertStyle?: StyleProp<ViewStyle>;
	loading?: boolean;
	loadingComponent?: JSX.Element;
	emptyComponent?: JSX.Element;
	onPress: (project: Project) => void;
}

const ProjectTeaserCardList = (props: Props): JSX.Element => {
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
								contentContainerStyle={props.contentContainertStyle}
								showsHorizontalScrollIndicator={false}>
								{props.items.map((item: Project, index: number) => {
									const isLastItem = index === props.items.length;
									const cardStyle: StyleProp<ViewStyle> = { 
										marginBottom: isLastItem ? 0 : Theme.spacing.spacingXL 
									};

									return (
										<ProjectTeaserCard
											key={item.id}
											name={item.name}
											imageUrl={item.imageUrl}
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

export default ProjectTeaserCardList;