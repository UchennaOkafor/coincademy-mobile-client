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
	categories: string[];
	marketCap: number;
	type: 'project' | 'token' | 'coin';
}