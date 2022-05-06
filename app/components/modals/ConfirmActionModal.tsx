import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Theme } from 'styles/Index';
import Modal from "react-native-modal";
import Spacer from 'components/common/Spacer';

interface Props {
	visible: boolean;
	title: string;
	text: string;
	primaryButton: { text: string, onClick: () => void},
	secondaryButton: { text: string, onClick: () => void }
}

const ConfirmActionModal = (props: Props): JSX.Element => {
	return (
		<Modal
			style={styles.modal}
			hideModalContentWhileAnimating={true}
			useNativeDriver={true}
			useNativeDriverForBackdrop={true}
			isVisible={props.visible}>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{props.title}</Text>
				<Spacer vertical={Theme.spacing.spacing2XS} />
				<Text style={styles.text}>{props.text}</Text>
				<Spacer vertical={Theme.spacing.spacingXS} />
				<View style={styles.buttonsContainer}>
					<TouchableOpacity onPress={props.secondaryButton.onClick} style={styles.textButtonTouchable}>
						<Text style={[styles.baseTextButton, {color: Theme.colors.gray}]}>{props.secondaryButton.text}</Text>
					</TouchableOpacity>
					<Spacer horizontal={Theme.spacing.spacingXS} />
					<TouchableOpacity onPress={props.primaryButton.onClick} style={styles.textButtonTouchable}>
						<Text style={[styles.baseTextButton, {color: Theme.colors.red}]}>{props.primaryButton.text}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		marginTop: Theme.spacing.spacing3XL,
	},
	contentContainer: {
		backgroundColor: Theme.colors.white,
		borderRadius: Theme.radius.normal,
		padding: Theme.spacing.spacingL,
	},
	title: {
		...Theme.typography.text.h4,
		...Theme.typography.weight.bold,
	},
	text: {
		...Theme.typography.text.h5,
		...Theme.typography.weight.light,
	},
	buttonsContainer: {
		flexDirection: 'row', 
		justifyContent: 'flex-end',
	},
	textButtonTouchable: {
		paddingVertical: Theme.spacing.spacing2XS, 
		paddingLeft: Theme.spacing.spacingS
	},
	baseTextButton: {
		...Theme.typography.text.h5,
		...Theme.typography.weight.medium,
	},
});

export default ConfirmActionModal;
