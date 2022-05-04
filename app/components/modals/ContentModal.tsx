import Button from 'components/buttons/Button';
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { Theme } from 'styles/Index';
import Modal from "react-native-modal";
import Spacer from 'components/common/Spacer';

interface Props {
	visible: boolean;
	title?: string;
	text?: string;
	image?: ImageSourcePropType;
	primaryButton: { text: string, onClick: () => void },
	secondaryButton: { text: string, onClick: () => void },
}

const ContentModal = (props: Props): JSX.Element => {
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
				<Spacer vertical={Theme.spacing.spacingS} />
				{props.image && (
					<View style={styles.imageContainer}>
						<Image source={props.image} style={styles.image} />
					</View>
				)}
				<Spacer vertical={Theme.spacing.spacingS} />
				<View style={styles.buttonContainer}>
					<Button
						text={props.primaryButton.text}
						onPress={props.primaryButton.onClick}
						squircle={true}
					/>
					<Spacer horizontal={Theme.spacing.spacingXS} />
					<TouchableOpacity onPress={props.secondaryButton.onClick}>
						<Text style={styles.secondaryAction}>{props.secondaryButton.text}</Text>
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
		paddingHorizontal: Theme.spacing.spacingXL,
		paddingVertical: Theme.spacing.spacing3XL,
	},
	title: {
		...Theme.typography.text.h3,
		...Theme.typography.weight.semiBold,
		textAlign: 'center'
	},
	text: {
		...Theme.typography.text.body,
	},
	buttonContainer: {
		flexDirection: 'column', 
		alignItems: 'center'
	},
	imageContainer: {
		overflow: 'hidden',
		borderRadius: Theme.spacing.spacingXS
	},
	image: {
		width: '100%', 
		height: 200 
	},
	secondaryAction: {
		...Theme.typography.text.h5, 
		...Theme.typography.weight.medium, 
		color: Theme.colors.gray, 
		textDecorationLine: 'underline'
	}
});

export default ContentModal;
