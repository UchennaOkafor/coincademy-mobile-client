import { Colors } from './Colors';
import { Spacing } from './Spacing';
import { text } from './Text';

interface ButtonThemeStyleProps {
	enabled: string;
	disabled: string;
}

export interface ButtonThemeStyle {
	text: ButtonThemeStyleProps,
	background: ButtonThemeStyleProps,
	border: ButtonThemeStyleProps
}

export interface ButtonThemeSize {
	font: {fontSize: number; fontFamily: string; color: string},
	paddingVertical: number,
	paddingHorizontal: number
}

export const sizes = {
	small: {
		font: text.h6,
		paddingHorizontal: Spacing.spacingS + Spacing.spacing3XS,
		paddingVertical: Spacing.spacingS + Spacing.spacing3XS
	} as ButtonThemeSize,
	medium: {
		font: text.h5,
		paddingHorizontal: Spacing.spacingM,
		paddingVertical: Spacing.spacingS + Spacing.spacing3XS
	}
}

export const styles = {
	primary: {
		text: {
			enabled: Colors.white,
			disabled: Colors.white,
		},
		background: {
			enabled: Colors.purple,
			disabled: Colors.backgroundGrayDark,
		}
	} as ButtonThemeStyle,
	secondaryOutline: {
		text: {
			enabled: Colors.purple,
			disabled: Colors.white,
		},
		background: {
			enabled: Colors.white,
			disabled: Colors.backgroundGrayDark,
		},
		border: {
			enabled: Colors.purple,
			disabled: Colors.backgroundGrayDark
		}
	} as ButtonThemeStyle,
	danger: {
		text: {
			enabled: Colors.white,
			disabled: Colors.white,
		},
		background: {
			enabled: Colors.red,
			disabled: Colors.backgroundGrayDark,
		}
	} as ButtonThemeStyle,
	soft: {
		text: {
			enabled: Colors.white,
			disabled: Colors.white,
		},
		background: {
			enabled: Colors.purpleLight,
			disabled: Colors.backgroundGrayDark,
		}
	} as ButtonThemeStyle,
	white: {
		text: {
			enabled: Colors.black,
			disabled: Colors.white,
		},
		background: {
			enabled: Colors.white,
			disabled: Colors.backgroundGrayDark,
		}
	} as ButtonThemeStyle,
	black: {
		text: {
			enabled: Colors.white,
			disabled: Colors.white,
		},
		background: {
			enabled: Colors.black,
			disabled: Colors.backgroundGrayDark,
		}
	} as ButtonThemeStyle
};