import RNBounceable from '@freakycoder/react-native-bounceable';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Spacer from 'components/common/Spacer';
import ToggleIcon from 'components/common/ToggleIcon';
import HeaderBackButton from 'components/headers/HeaderBackButton';
import Project from 'models/Project';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, Image } from 'react-native';
import { Heart } from 'react-native-feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from 'styles/Index';

interface ProjectRouteProps {
	project: Project;
}

const Discover = (): JSX.Element => {
	const navigation = useNavigation();
	const route = useRoute<RouteProp<{ params: ProjectRouteProps }, 'params'>>();
	const project = route.params.project;
	const insets = useSafeAreaInsets();

	useEffect(() => {
		navigation.setOptions({ headerTitle: project.name });
	}, []);
	
	return (
		<ScrollView style={[styles.container, { paddingTop: insets.top + Theme.spacing.spacingS }]}>
			<HeaderBackButton
				onPress={() => navigation.goBack()}
				rightComponent={
					<ToggleIcon
						size={20}
						onChecked={(checked: boolean) => {}}
					/>
				}
			/>
			<Spacer />
			<Text style={styles.title}>{project.name}</Text>
			<Image 
				resizeMode="cover" 
				style={styles.image} 
				source={{ uri: project.imageUrl }} 
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: Theme.spacing.spacingM,
		backgroundColor: Theme.colors.backgroundGray
	},
	title: {
		...Theme.typography.text.h4,
		...Theme.typography.weight.bold
	},
	image: {
		width: 100, 
		height: 100
	}
});

export default Discover;
