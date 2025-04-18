import { useNavigation } from '@react-navigation/native';
import Button from 'components/buttons/Button';
import Spacer from 'components/common/Spacer';
import GradientText from 'components/texts/GradientText';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, {  } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from 'styles/Index';

const Welcome = (): JSX.Element => {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.container}>
			<StatusBar style='light' translucent={true} />
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				colors={[Theme.colors.orange, Theme.colors.blue]}
				style={{ paddingTop: insets.top + Theme.spacing.spacing3XL * 2 }}>
				<Image
					source={require('@assets/images/astronaut.png')}
					resizeMode="contain"
					style={styles.image}
				/>
			</LinearGradient>

			<View style={styles.contentContainer}>
				<Spacer vertical={Theme.spacing.spacing3XS} />
				<GradientText style={styles.title} colors={[]}>Exploring web3</GradientText>
				<Spacer vertical={Theme.spacing.spacing2XS} />
				<Text style={styles.subtitle}>
					Discover and learn about your next favourite crypto project.
				</Text>
				<Spacer />

				<View style={styles.buttonContainer}>
					<Button
						text="Get Started"
						onPress={() => navigation.navigate('Onboarding')}
					/>

					<Spacer vertical={Theme.spacing.spacingXS} />

					{/* <Button
						text="Sign in"
						onPress={navigateToLogin}
						theme={Theme.buttons.styles.secondaryOutline}
					/> */}
				</View>
			</View>
		</View>
	);

	function navigateToLogin(): void {
		navigation.navigate('Login');
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.colors.backgroundGray,
	},
	contentContainer: {
		flex: 1,
		padding: Theme.spacing.spacingM
	},
	image: {
		width: '100%',
		height: 225,
	},
	title: {
		...Theme.typography.text.h2, 
		...Theme.typography.weight.extraBold 
	},
	subtitle: {
		...Theme.typography.text.body, 
		...Theme.typography.weight.medium, 
		color: Theme.colors.grayDark900
	},
	buttonContainer: {
		marginTop: 'auto',
		marginBottom: Theme.spacing.spacingM
	}
});

export default Welcome;
