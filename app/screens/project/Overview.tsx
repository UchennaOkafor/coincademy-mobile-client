import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Spacer from 'components/common/Spacer';
import ToggleIcon from 'components/common/ToggleIcon';
import HeaderBackButton from 'components/headers/HeaderBackButton';
import Project from 'models/Project';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from 'styles/Index';
import { TabView, TabBar, SceneRendererProps } from 'react-native-tab-view';
import BaseLayout from 'components/layout/BaseLayout';
import Overview from './tabs/Overview';
import Learn from './tabs/Learn';
import Tokenomics from './tabs/Tokenomics';
import Company from './tabs/Company';

interface ProjectRouteProps {
	project: Project;
}

type SceneRendererRouteProps = SceneRendererProps & { route: { key: string, title: string } };

const ProjectOverview = (): JSX.Element => {
	const navigation = useNavigation();
	const route = useRoute<RouteProp<{ params: ProjectRouteProps }, 'params'>>();
	const project = route.params.project;
	const insets = useSafeAreaInsets();
	const [tabInitialized, setTabInitialized] = useState(false);

	useEffect(() => {
		navigation.setOptions({ headerTitle: project.name });
	}, []);

	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);
	const [routes, setRoutes] = React.useState([
		{ key: 'overview', title: 'Overview' }
	]);

	const renderScene = (props: SceneRendererRouteProps) => {
		switch (props.route.key) {
			case 'overview':
				return <Overview project={project} />;
			case 'learn':
				return <Learn project={project} />;
			case 'tokenomics':
				return <Tokenomics project={project} />;
			case 'company':
				return <Company project={project} />;
			default:
				return null;
		}
	};

	useEffect(() => {
		if (tabInitialized) {
			return;
		}

		const extraRoutes = [];

		const isProject = project.type === 'project';
		const isTokenOrCoin = (project.type === 'coin' || project.type === 'token');
		
		const tokenomicsTabExists = routes.findIndex(e => e.key === 'tokenomics') > -1;
		const companyTabExists = routes.findIndex(e => e.key === 'company') > -1;

		if (isTokenOrCoin && !tokenomicsTabExists) {
			extraRoutes.push({ key: 'tokenomics', title: 'Tokenomics' });
		} else if (isProject && !companyTabExists) {
			extraRoutes.push({ key: 'company', title: 'Company' });
		}
		
		extraRoutes.push({ key: 'learn', title: 'Learn' });
		setRoutes([...routes, ...extraRoutes]);
		setTabInitialized(true);
	}, []);

	return (
		<BaseLayout style={{flex: 1}} scrollable={false}>
			<HeaderBackButton
				onPress={() => navigation.goBack()}
				rightComponent={
					<ToggleIcon
						size={20}
						onChecked={(checked: boolean) => {}}
						style={{ marginRight: 5}}
					/>
				}
			/>
			<View style={styles.header}>
				<View style={{ flex: 1 }}>
					<Text style={styles.title}>
						{project.name}
						<Text style={styles.subtitle}>
							{` • ${project.symbol}`}
						</Text>
					</Text>
					<Spacer vertical={Theme.spacing.spacing3XS} />
					<Text style={styles.subtitle}>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					</Text>
				</View>
				<Image
					resizeMode="cover"
					style={styles.image}
					source={{ uri: project.logoUrl }}
				/>
			</View>

			<TabView
				navigationState={{index, routes}}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				style={styles.tabView}
				renderTabBar={props => (
					<TabBar
						{...props}
						style={styles.tabBar}
						indicatorStyle={styles.tabIndicator}
						labelStyle={styles.tabLabel}
					/>
				)}
			/>
		</BaseLayout>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		alignItems: 'center',
		marginTop: Theme.spacing.spacingXL,
		marginBottom: Theme.spacing.spacingS,
	},
	title: {
		...Theme.typography.text.h4,
		...Theme.typography.weight.bold,
	},
	subtitle: {
		...Theme.typography.text.h7,
		...Theme.typography.weight.normal,
		color: Theme.colors.grayDark,
	},
	image: {
		width: 55, 
		height: 55,
		borderRadius: Theme.radius.normal,
		marginLeft: Theme.spacing.spacingXL
	},
	tabView: {
		marginHorizontal: -Theme.spacing.spacingM 
	},
	tabBar: {
		...Theme.shadows.none, 
		backgroundColor: Theme.colors.transparent, 
		marginHorizontal: Theme.spacing.spacingM
	},
	tabIndicator: {
		backgroundColor: Theme.colors.blue,
	},
	tabLabel: {
		...Theme.typography.text.h7, 
		color: Theme.colors.black, 
		textTransform: 'none'
	}
});

export default ProjectOverview;
