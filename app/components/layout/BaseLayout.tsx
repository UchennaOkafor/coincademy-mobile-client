import { useNavigation } from '@react-navigation/native';
import Spacer from 'components/common/Spacer';
import HeaderBackButton from 'components/headers/HeaderBackButton';
import React, { ReactElement } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
}

const BaseView = (props: Props): JSX.Element => {
	const insets = useSafeAreaInsets();
	//const style = [styles.container, { paddingTop: insets.top + Theme.spacing.spacingS }];
	const style = [styles.container];

	if (props.scrollable === true) {
		return (
			<ScrollView 
				style={style} 
				contentContainerStyle={styles.defaultPadding}>
				{props.children}
			</ScrollView>
		);
	}

	return (
		<View style={[style, styles.defaultPadding]}>
			{props.children}
		</View>
	);
}

const BaseLayout = (props: Props): JSX.Element => {
	const navigation = useNavigation();

	return (
		<BaseView {...props}>
			{/* <HeaderBackButton
				onPress={() => navigation.canGoBack() ?? navigation.goBack()}
			/> */}
			{/* <Spacer /> */}
			{props.children}
		</BaseView>
	);
};

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
