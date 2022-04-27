import Project from 'models/Project';
import React from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Theme } from 'styles/Index';
import ProjectCard from './ProjectCard';

interface Props {
	projects: Project[];
	style?: StyleProp<ViewStyle>;
	contentContainertStyle?: StyleProp<ViewStyle>;
	loading?: boolean;
	loadingComponent?: JSX.Element;
	emptyComponent?: JSX.Element;
	onPress: (project: Project) => void;
}

const ProjectCardList = (props: Props): JSX.Element => {
	return (
		<View style={props.style}>
			{props.loading ? (
				props.loadingComponent
			) : (
				<>
						{props.projects == null || props.projects.length === 0 ? (
						props.emptyComponent
					) : (
						<>
							<ScrollView
								horizontal={true}
								contentContainerStyle={props.contentContainertStyle}
								showsHorizontalScrollIndicator={false}>
								{props.projects.map((item: Project, index: number) => {
									const isLastItem = index === props.projects.length;
									const cardStyle: StyleProp<ViewStyle> = { 
										marginRight: isLastItem ? 0 : Theme.spacing.spacingM 
									};

									return (
										<ProjectCard
											key={item.id}
											project={item}
											onPress={() => props.onPress(item)}
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

export default ProjectCardList;