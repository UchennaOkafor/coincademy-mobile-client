import Spacer from 'components/common/Spacer';
import TeamMember from 'components/common/TeamMember';
import Project from 'models/Project';
import React, {  } from 'react';
import { ScrollView, StyleSheet, Text, Image, View } from 'react-native';
import { Theme } from 'styles/Index';

interface Props {
	project: Project;
}

const Company = (props: Props) => {

	return (
		<ScrollView 
			showsVerticalScrollIndicator={false} 
			style={styles.container}>
			<Text style={styles.subheading}>Financials</Text>
			<Text style={styles.text}>Growth Stage: 🌱 Seed</Text>
			<Text style={styles.text}>Valuation: $2.4 billion</Text>
			<Text style={styles.text}>Market Cap: $51.4 billion</Text>

			<Spacer />

			<Text style={styles.subheading}>Fundamentals</Text>
			<Text style={styles.text}>P/E ratio</Text>

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
	);
}

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

export default Company;
