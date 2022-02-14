import { Book, LogOut, Trash2, File } from "react-native-feather";
import { Theme } from "styles/Index";

export interface SettingsItem {
	id: string;
	title: string;
	icon: JSX.Element;
	color: string;
}

export interface SettingsSections {
	title: string;
	items: SettingsItem[];
}

export default class SettingsListData {
	static getSettingsSections(): SettingsSections[] {
		const loginItems: SettingsItem[] = [{
			id: 'logout',
			title: 'Logout',
			icon: LogOut,
			color: Theme.colors.red,
			
		}, {
			id: 'clear_cache',
			title: 'Clear cache',
			icon: Trash2,
			color: Theme.colors.gray
		}];

		const aboutItems: SettingsItem[] = [{
			id: 'privacy_policy',
			title: 'Privacy Policy',
			icon: File,
			color: Theme.colors.grayDark
		}, {
			id: 'terms_of_service',
			title: 'Terms of Service',
			icon: Book,
			color: Theme.colors.grayDark
		}];

		const sections: SettingsSections[] = [
			{ title: 'About', items: aboutItems },
			{ title: 'Device', items: loginItems },
		];

		return sections;
	}
}