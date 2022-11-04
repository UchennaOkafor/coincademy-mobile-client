import Button from 'components/buttons/Button';
import InterestCard from 'components/cards/InterestCard';
import Spacer from 'components/common/Spacer';
import EmojiItem from 'models/EmojiItem';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatGrid } from 'react-native-super-grid';
import OnboardingData from 'resources/OnboardingData';
import { Theme } from 'styles/Index';

interface Props {
	onNext: (interests: EmojiItem[]) => void;
}

const SelectInterestStep = (props: Props): JSX.Element => {
	const insets = useSafeAreaInsets();
	const bottomButtonPadding = insets.bottom === 0 ? undefined : insets.bottom;
	const [selectedInterests, setSelectedInterests] = useState<EmojiItem[]>([]);

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.title}>Select your interests</Text>
				<Spacer vertical={Theme.spacing.spacing3XS} />
				<Text style={styles.subtitle}>We use this to personalize your experience</Text>
				<Spacer vertical={Theme.spacing.spacing2XS} />
			</View>
			<FlatGrid
				data={OnboardingData.getInterests()}
				spacing={Theme.spacing.spacingS}
				maxItemsPerRow={2}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<InterestCard
						emoji={item.emoji}
						name={item.name}
						onPress={() => {
							let interests: EmojiItem[] = [];

							if (selectedInterests.some(e => e.id === item.id)) {
								interests = selectedInterests.filter(e => e.id !== item.id);
							} else {
								interests = selectedInterests.concat(item)
							}
							
							setSelectedInterests(interests);
						}}
					/>
				)}
				keyExtractor={(item) => item.id}
			/>
			<View style={[styles.buttonContainer, { paddingBottom: bottomButtonPadding }]}>
				<Button
					text="Continue"
					disabled={selectedInterests.length < 2}
					theme={Theme.buttons.styles.primary}
					onPress={() => props.onNext?.(selectedInterests)}
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

export default SelectInterestStep;
