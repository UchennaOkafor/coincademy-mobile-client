import { Colors } from './Colors';

interface ButtonThemeProps {
	enabled: string;
	disabled: string;
}

export interface ButtonTheme {
	text: ButtonThemeProps,
	background: ButtonThemeProps,
	border: ButtonThemeProps
}

export const presets = {
	primary: {
		text: {
			enabled: Colors.white,
			disabled: Colors.white,
		},
		background: {
			enabled: Colors.purple,
			disabled: Colors.backgroundGrayDark,
		}
	} as ButtonTheme,
	soft: {
		text: {
			enabled: Colors.white,
			disabled: Colors.white,
		},
		background: {
			enabled: Colors.purpleLight,
			disabled: Colors.backgroundGrayDark,
		}
	} as ButtonTheme,
	white: {
		text: {
			enabled: Colors.black,
			disabled: Colors.white,
		},
		background: {
			enabled: Colors.white,
			disabled: Colors.backgroundGrayDark,
		}
	} as ButtonTheme,
	black: {
		text: {
			enabled: Colors.white,
			disabled: Colors.white,
		},
		background: {
			enabled: Colors.black,
			disabled: Colors.backgroundGrayDark,
		}
	} as ButtonTheme
};