import Button from 'components/buttons/Button';
import Spacer from 'components/common/Spacer';
import IconTextInput from 'components/inputs/IconTextInput';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { User } from 'react-native-feather';
import { Theme } from 'styles/Index';

interface Props {
	onNext: (firstname: string, lastname: string) => void;
}

const EnterNameStep = (props: Props): JSX.Element => {
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.title}>Who art thou?</Text>
				<Spacer vertical={Theme.spacing.spacing3XS} />
				<Text style={styles.subtitle}>So we know what you call you</Text>

				<Spacer vertical={Theme.spacing.spacingXS} />
				<IconTextInput
					autoCapitalize="none"
					keyboardType="default"
					icon={
						<User
							stroke={Theme.colors.gray}
							fill={Theme.colors.transparent}
							width={21}
							height={21}
							strokeWidth={2}
						/>
					}
					placeholder="Firstname"
					onChangeText={(text: string) => setFirstname(text)}
				/>
				<Spacer vertical={Theme.spacing.spacingXS} />
				<IconTextInput
					autoCapitalize="none"
					keyboardType="default"
					icon={
						<User
							stroke={Theme.colors.gray}
							fill={Theme.colors.transparent}
							width={21}
							height={21}
							strokeWidth={2}
						/>
					}
					placeholder="Lastname"
					onChangeText={(text: string) => setLastname(text)}
				/>
			</View>

			<View style={styles.buttonContainer}>
				<Button
					text="Continue"
					disabled={firstname?.trim() === '' || lastname?.trim() === ''}
					theme={Theme.buttons.styles.primary}
					onPress={() => props.onNext?.(firstname, lastname)}
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
	subtitle: {
		...Theme.typography.text.h5, 
		...Theme.typography.weight.normal, 
		color: Theme.colors.gray 
	}
});

export default EnterNameStep;
