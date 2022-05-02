import { MotiView } from 'moti';
import React from 'react';

interface Props {
	children: React.ReactNode;
	index?: number;
	style?: React.ComponentProps<typeof MotiView>['style'];
}

const presenceAnimation: React.ComponentProps<typeof MotiView> = {
	from: {
		opacity: 0,
		translateY: 4
	},
	animate: {
		opacity: 1,
		translateY: 0
	},
	exit: {
		opacity: 0,
		translateY: 0
	}
}

const PresenceView = (props: Props): JSX.Element => {
	return (
		<MotiView 
			style={props.style} 
			{...presenceAnimation} 
			delay={(props.index ?? 1) * 40}>
			{props.children}
		</MotiView>
	);
};

export default PresenceView;
