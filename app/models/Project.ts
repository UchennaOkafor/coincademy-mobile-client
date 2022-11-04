export default interface Project {
	id: string;
	name: string;
	shortDescription: string;
	description: string;
	symbol: string;
	logoUrl: string;
	fullLogoUrl: string;
	imageUrl: string;
	tags: string[];
	primaryCategory: string;
	categories: string[];
	marketCap: number;
	type: 'project' | 'token' | 'coin';
	links: {
		website: Link,
		discord: string,
		twitter: Link,
		reddit: Link
	}
}

interface Link {
	label: string;
	link: string;
}