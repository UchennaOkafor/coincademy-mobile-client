import Spacer from 'components/common/Spacer';
import TeamMember from 'components/common/TeamMember';
import Project from 'models/Project';
import React, {  } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Theme } from 'styles/Index';

interface Props {
	project: Project;
}

const Tokenomics = (props: Props) => {
	
	return (
		<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
			<Text style={styles.subheading}>Financials</Text>
			<Text style={styles.text}>Market Cap: $2.4 billion</Text>
			<Text style={styles.text}>Total Supply: 15.4 coins</Text>
			<Text style={styles.text}>Circulating Supply: 51.4 billion coins</Text>
			<Text style={styles.text}>Proof Of Work</Text>
			<Text style={styles.text}>Staking</Text>
			<Text style={styles.text}>Inflationary Coin</Text>

			<Spacer />

			<Text style={styles.subheading}>Network</Text>
			<Text style={styles.text}>Etheruem ERC-20</Text>

			<Spacer />

			<Text style={styles.subheading}>Team</Text>
			<TeamMember
				name="John Doe"
				imageUrl="https://i.pravatar.cc/300"
			/>
			<TeamMember
				name="Mary Doe"
				imageUrl="https://i.pravatar.cc/300"
			/>
		</ScrollView>
	)
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Theme.colors.transparent,
		padding: Theme.spacing.spacingM,
	},
	subheading: {
		...Theme.typography.text.h6,
		marginBottom: Theme.spacing.spacingXS
	},
	text: {
		...Theme.typography.text.h7,
		...Theme.typography.weight.medium,
		color: Theme.colors.grayDark,
		marginBottom: Theme.spacing.spacingXS
	}
});

export default Tokenomics;
