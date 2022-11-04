import Button from 'components/buttons/Button';
import Spacer from 'components/common/Spacer';
import IconTextInput from 'components/inputs/IconTextInput';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { User, Users } from 'react-native-feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from 'styles/Index';

interface Props {
	onNext: (displayName: string) => void;
}

const EnterNameStep = (props: Props): JSX.Element => {
	const [displayName, setDisplayName] = useState('');
	const insets = useSafeAreaInsets();
	const bottomButtonPadding = insets.bottom === 0 ? undefined : insets.bottom;
	
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.title}>What's your name?</Text>
				<Spacer vertical={Theme.spacing.spacing3XS} />
				<Text style={styles.subtitle}>Just so we know what to call you</Text>

				<Spacer vertical={Theme.spacing.spacingS} />
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
					placeholder="Display name"
					onChangeText={(text: string) => setDisplayName(text)}
				/>
				<Spacer vertical={Theme.spacing.spacingXS} />
			</View>

			<View style={[styles.buttonContainer, { paddingBottom: bottomButtonPadding }]}>
				<Button
					text="Continue"
					disabled={displayName?.trim() === ''}
					theme={Theme.buttons.styles.primary}
					onPress={() => props.onNext?.(displayName)}
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
		...Theme.typography.text.h4 
	},
	subtitle: {
		...Theme.typography.text.h6, 
		...Theme.typography.weight.normal, 
		color: Theme.colors.gray 
	}
});

export default EnterNameStep;
