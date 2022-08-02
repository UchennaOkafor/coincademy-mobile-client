import { useNavigation } from '@react-navigation/native';
import Spacer from 'components/common/Spacer';
import HeaderBackButton from 'components/headers/HeaderBackButton';
import React, { ReactElement } from 'react';
import { RefreshControlProps, ScrollView, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from 'styles/Index';

interface Props {
	title?: string;
	header?: ReactElement;
	children?: React.ReactNode;
	scrollable?: boolean;
	paddingHorizontal?: number;
	paddingVertical?: number;
	useSafeAreaView?: boolean;
	useInsets?: boolean;
	style?: StyleProp<ViewStyle>;
	refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
}

const ContentView = (props: Props): JSX.Element => {
	const insets = useSafeAreaInsets();
	//const style = [styles.container, { paddingTop: insets.top + Theme.spacing.spacingS }];

	if (props.scrollable === true) {
		return (
			<ScrollView 
				contentContainerStyle={[styles.defaultPadding, props.style]}
				showsVerticalScrollIndicator={false}
				refreshControl={props.refreshControl}>
				{props.children}
			</ScrollView>
		);
	}

	return (
		<View style={[styles.defaultPadding, props.style]}>
			{props.children}
		</View>
	);
}

const BaseLayout = (props: Props): JSX.Element => {
	//const navigation = useNavigation();
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.container, {
			paddingTop: insets.top,
			paddingBottom: 0,
			paddingLeft: insets.left,
			paddingRight: insets.right
		}]}>
			<ContentView {...props}>
				{/* <HeaderBackButton
					onPress={() => navigation.canGoBack() ?? navigation.goBack()}
				/> */}
				<Spacer vertical={Theme.spacing.spacing2XS + Theme.spacing.spacing3XS} />
				{props.children}
			</ContentView>
		</View>
	);
};

//THE OLD ONE
// const BaseLayout = (props: Props): JSX.Element => {
// 	const navigation = useNavigation();

// 	return (
// 		<SafeAreaView edges={['top']} style={styles.container}>
// 			<ContentView {...props}>
// 				{/* <HeaderBackButton
// 					onPress={() => navigation.canGoBack() ?? navigation.goBack()}
// 				/> */}
// 				<Spacer vertical={Theme.spacing.spacing2XS + Theme.spacing.spacing3XS} />
// 				{props.children}
// 			</ContentView>
// 		</SafeAreaView>
// 	);
// };

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.colors.backgroundGray
	},
	defaultPadding: {
		paddingHorizontal: Theme.spacing.spacingM,
	}
});

export default BaseLayout;
