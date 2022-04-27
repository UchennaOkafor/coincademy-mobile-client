import { useNavigation } from '@react-navigation/native';
import Button from 'components/buttons/Button';
import Spacer from 'components/common/Spacer';
import GradientText from 'components/texts/GradientText';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, {  } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserStore } from 'state/useUserStore';
import { Theme } from 'styles/Index';

const Welcome = (): JSX.Element => {
	const navigation = useNavigation();
	const userStore = useUserStore();
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.container}>
			<StatusBar style='light' translucent={true} />
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				colors={[Theme.colors.orange, Theme.colors.blue]}
				style={{ backgroundColor: 'green', paddingTop: insets.top + Theme.spacing.spacingS }}>
				<Image
					source={require('@assets/images/astronaut.png')}
					resizeMode="contain"
					style={styles.image}
				/>
			</LinearGradient>

			<View style={{ padding: Theme.spacing.spacingM }}>
				{/* <GradientText style={styles.title}>Explore web3</GradientText> */}
				<Text style={styles.title}>Explore web3</Text>
				<Spacer vertical={Theme.spacing.spacing3XS} />
				<Text style={styles.subtitle}>Your next favourite project is only a few taps away</Text>
				<Spacer />

				<View style={styles.buttonContainer}>
					<Button
						squircle={true}
						text="Create account"
						onPress={() => navigation.navigate('Onboarding')}
					/>

					<Spacer vertical={Theme.spacing.spacing2XS} />

					<Button
						text="Sign in"
						onPress={navigateToLogin}
						theme={Theme.buttons.styles.secondaryOutline}
						squircle={true}
					/>
				</View>
			</View>
		</View>
	);

	function navigateToLogin(): void {
		userStore.setOnboardingComplete();
		navigation.navigate('Login');
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.colors.backgroundGray,
	},
	image: {
		width: 400,
		height: 200,
	},
	title: {
		...Theme.typography.text.h2, 
		...Theme.typography.weight.extraBold 
	},
	subtitle: {
		...Theme.typography.text.h6, 
		...Theme.typography.weight.medium, 
		color: Theme.colors.gray
	},
	buttonContainer: {
		marginTop: Theme.spacing.spacingXL
	}
});

export default Welcome;
