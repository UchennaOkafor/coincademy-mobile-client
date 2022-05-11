import Button from 'components/buttons/Button';
import InterestCard from 'components/cards/InterestCard';
import Spacer from 'components/common/Spacer';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Theme } from 'styles/Index';

interface Props {
	onNext: (interests: string[]) => void;
}

interface InterestType {
	emoji: string;
	name: string;
}

const SelectInterestStep = (props: Props): JSX.Element => {
	const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

	const categories: InterestType[] = [{
		emoji: '🌎',
		name: 'web3'
	}, {
		emoji: '🧑‍💻',
		name: 'Tech'
	}, {
		emoji: '💻',
		name: 'Developer'
	}, {
		emoji: '💼',
		name: 'Business'
	}, {
		emoji: '💰',
		name: 'Fintech'
	}, {
		emoji: '💸',
		name: 'Passive Income'
	}, {
		emoji: '🪙',
		name: 'DeFi'
	}, {
		emoji: '🎮',
		name: 'eSports & Gaming'
	}, {
		emoji: '♻️',
		name: 'Sustainability'
	}, {
		emoji: '🍃',
		name: 'Green Energy'
	}, {
		emoji: '💊',
		name: 'Healthcare'
	}, {
		emoji: '🦄',
		name: 'Startups'
	}, {
		emoji: '🥽',
		name: 'AR/VR'
	}, {
		emoji: '🕶',
		name: 'Metaverse'
	}, {
		emoji: '🖼',
		name: 'Collectibles/NFTs'
	}, {
		emoji: '🐕',
		name: 'Meme Coins'
	}, {
		emoji: '🏡',
		name: 'Real Estate'
	}, {
		emoji: '🏃‍♂️',
		name: 'Fitness & Wellbeing'
	}, {
		emoji: '🎓',
		name: 'Education'
	}, {
		emoji: '🍿',
		name: 'Media & Entertainment'
	}];

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.title}>Select your interests</Text>
				<Spacer vertical={Theme.spacing.spacing3XS} />
				<Text style={styles.subtitle}>We use this to personalize your experience</Text>
				<Spacer vertical={Theme.spacing.spacing2XS} />
			</View>
			<FlatGrid
				data={categories}
				spacing={Theme.spacing.spacingS}
				maxItemsPerRow={2}
				showsVerticalScrollIndicator={false}
				renderItem={({ item, index }) => (
					<InterestCard
						emoji={item.emoji}
						name={item.name}
						onPress={() => {
							let interests: string[] = [];

							if (selectedInterests.includes(item.name)) {
								interests = selectedInterests.filter(e => e !== item.name);
							} else {
								interests = selectedInterests.concat(item.name)
							}

							setSelectedInterests(interests);
						}}
					/>
				)}
				keyExtractor={(item, index) => item.name}
			/>
			<View style={styles.buttonContainer}>
				<Button
					text="Continue"
					disabled={selectedInterests.length < 3}
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
