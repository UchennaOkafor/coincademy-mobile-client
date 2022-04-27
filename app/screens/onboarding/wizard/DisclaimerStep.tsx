import Button from 'components/buttons/Button';
import Spacer from 'components/common/Spacer';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Theme } from 'styles/Index';

interface Props {
	onNext: () => void;
}

const DisclaimerStep = (props: Props): JSX.Element => {
	const [checked, setIsChecked] = useState(false);

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.title}>Do your own research (DYOR)</Text>
				<Spacer vertical={Theme.spacing.spacing3XS} />
				<Text style={styles.disclaimerText}>
					Please, we require that you do your due dilligence.
					We're not responsible for your financial projects etc.
					We just show you projects in the web3 world.
				</Text>
				<Spacer vertical={Theme.spacing.spacingM} />
				<Text style={styles.consentText}>I understand</Text>
				<Spacer vertical={Theme.spacing.spacing2XS} />
				<BouncyCheckbox
					size={26}
					fillColor={Theme.colors.blue}
					unfillColor={Theme.colors.white}
					bounceFriction={8}
					iconStyle={styles.checkboxIcon}
					iconImageStyle={styles.checkboxIconImage}
					onPress={(checked: boolean) => setIsChecked(checked)}
				/>
			</View>

			<View style={styles.buttonContainer}>
				<Button
					text="Finish"
					disabled={!checked}
					theme={Theme.buttons.styles.primary}
					squircle={true}
					onPress={props.onNext}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: Theme.spacing.spacingM
	},
	buttonContainer: {
		marginTop: 'auto', 
		padding: Theme.spacing.spacingM, 
		backgroundColor: Theme.colors.white, 
		borderTopColor: Theme.colors.borderGray, 
		borderTopWidth: 1
	},
	title: {
		...Theme.typography.text.h3
	},
	disclaimerText: {
		...Theme.typography.text.body, 
		color: Theme.colors.grayDark 
	},
	consentText: {
		...Theme.typography.text.h5, 
		...Theme.typography.weight.medium, 
		color: Theme.colors.grayDark900
	},
	checkboxIcon: {
		borderRadius: Theme.radius.small, 
		borderWidth: 2
	},
	checkboxIconImage: {
		width: 15, 
		height: 15
	}
});

export default DisclaimerStep;
