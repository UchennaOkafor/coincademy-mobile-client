import Button from 'components/buttons/Button';
import ExperienceLevelCard from 'components/cards/ExperienceLevelCard';
import Spacer from 'components/common/Spacer';
import EmojiItem from 'models/EmojiItem';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatGrid } from 'react-native-super-grid';
import OnboardingData from 'resources/OnboardingData';
import { Theme } from 'styles/Index';

interface Props {
	onNext: (experienceLevel: EmojiItem) => void;
}

const SelectExperienceStep = (props: Props): JSX.Element => {
	const insets = useSafeAreaInsets();
	const bottomButtonPadding = insets.bottom === 0 ? undefined : insets.bottom;
	const [selectedExperience, setSelectedExperience] = useState<EmojiItem>();

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.title}>What is your experience level?</Text>
				<Spacer vertical={Theme.spacing.spacing3XS} />
				<Text style={styles.subtitle}>We use this to personalize your experience aswell</Text>
				<Spacer vertical={Theme.spacing.spacing2XS} />
			</View>

			<FlatGrid
				data={OnboardingData.getExperienceLevels()}
				spacing={Theme.spacing.spacingS}
				maxItemsPerRow={1}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<ExperienceLevelCard
						active={selectedExperience?.id === item.id}
						emoji={item.emoji}
						name={item.name}
						onPress={() => {
							setSelectedExperience(item);
						}}
					/>
				)}
				keyExtractor={(item) => item.id}
			/>
			
			<View style={[styles.buttonContainer, { paddingBottom: bottomButtonPadding }]}>
				<Button
					text="Continue"
					disabled={selectedExperience == null}
					theme={Theme.buttons.styles.primary}
					onPress={() => props.onNext?.(selectedExperience!)}
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

export default SelectExperienceStep;
