import Button from 'components/buttons/Button';
import Spacer from 'components/common/Spacer';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { CheckCircle, User } from 'react-native-feather';
import { Theme } from 'styles/Index';

interface Props {
	onNext: () => void;
}

const DisclaimerStep = (props: Props): JSX.Element => {
	const [checked, setIsChecked] = useState(false);
	const checkbox = useRef<BouncyCheckbox>(null);

	return (
		<>
			<ScrollView style={styles.container}>
				<Text style={styles.title}>Do Your Own Research (DYOR)</Text>
				<Spacer vertical={Theme.spacing.spacing3XS} />
				<Text style={styles.disclaimerText}>
					DYOR stands for Do Your Own Research.
					It is commonly used throughout the internet due to how fast and easily misinformation can spread.
					{'\n'}
				</Text>

				<CheckedText text="Research and understand a cryptocurrency before investing" />
				<CheckedText text="It's advised to make the decision on your own before investing, and not just because someone else has said it is worth it."/>
				<CheckedText text="Always remain skeptical and do your own research." />

				<Spacer vertical={Theme.spacing.spacing2XS} />
				<TouchableOpacity 
					onPress={() => checkbox.current?.onPress?.()}
					style={styles.consentContainer}>
					<BouncyCheckbox
						ref={checkbox}
						size={22}
						fillColor={Theme.colors.green}
						unfillColor={Theme.colors.white}
						bounceFriction={8}
						iconStyle={styles.checkboxIcon}
						iconImageStyle={styles.checkboxIconImage}
						onPress={(checked: boolean) => setIsChecked(checked)}
					/>
					<Text style={styles.consentText}>I understand what it means to DYOR</Text>
				</TouchableOpacity>
				<Spacer vertical={Theme.spacing.spacingS} />
			</ScrollView>

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

	function CheckedText({text}: {text: string}): JSX.Element {
		return (
			<View style={styles.checkedTextContainer}>
				<CheckCircle 
					width={26} 
					height={26} 
					fill={Theme.colors.green} 
					strokeWidth={2.5} 
					stroke={Theme.colors.white} 
					style={styles.checkedTextIcon} 
				/>
				<Text style={styles.disclaimerText}>
					{text}
				</Text>
			</View>
		);
	}
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
		flex: 1,
		...Theme.typography.text.body, 
		color: Theme.colors.grayDark 
	},
	consentContainer: {
		flexDirection: 'row', 
		alignItems: 'center',
		marginLeft: Theme.spacing.spacing2XS
	},
	consentText: {
		...Theme.typography.text.h5, 
		...Theme.typography.weight.semiBold, 
		color: Theme.colors.grayDark
	},
	checkboxIcon: {
		borderRadius: Theme.radius.normal, 
		borderWidth: 1.5,
		marginLeft: -Theme.spacing.spacing3XS,
	},
	checkboxIconImage: {
		width: 13, 
		height: 13
	},
	checkedTextContainer: {
		flexDirection: 'row', 
		marginBottom: Theme.spacing.spacingS + Theme.spacing.spacing3XS
	},
	checkedTextIcon: {
		marginRight: Theme.spacing.spacingS + Theme.spacing.spacing3XS
	}
});

export default DisclaimerStep;
