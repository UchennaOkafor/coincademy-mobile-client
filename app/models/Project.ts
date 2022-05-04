export default interface Project {
	id: string;
	name: string;
	shortDescription: string;
	description: string;
	symbol: string;
	iconUrl: string;
	brandImageUrl: string;
	imageUrl: string;
	tags: string[];
	categories: string[];
	type: string;
}