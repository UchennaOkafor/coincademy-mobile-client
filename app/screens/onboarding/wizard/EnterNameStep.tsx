import Button from 'components/buttons/Button';
import Spacer from 'components/common/Spacer';
import IconTextInput from 'components/inputs/IconTextInput';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { User } from 'react-native-feather';
import { Theme } from 'styles/Index';

interface Props {
	onNext: (name: string) => void;
}

const EnterNameStep = (props: Props): JSX.Element => {
	const [name, setName] = useState('');

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.title}>Who art thou?</Text>
				<Text style={styles.subtitle}>So we know what you call you</Text>

				<Spacer vertical={Theme.spacing.spacingXS} />
				<IconTextInput
					autoCapitalize="none"
					keyboardType="default"
					icon={
						<User
							stroke="gray"
							fill={Theme.colors.transparent}
							width={21}
							height={21}
						/>
					}
					placeholder="E.g. John Doe"
					onChangeText={(text: string) => setName(text)}
				/>
			</View>

			<View style={styles.buttonContainer}>
				<Button
					text="Continue"
					disabled={name?.trim() === ''}
					squircle={true}
					theme={Theme.buttons.styles.primary}
					onPress={() => props.onNext?.(name)}
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
