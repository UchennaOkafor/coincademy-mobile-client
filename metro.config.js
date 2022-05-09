const { getDefaultConfig } = require('@expo/metro-config');

const { resolver } = getDefaultConfig(__dirname);

exports.resolver = {
	...resolver,
	sourceExts: [
		...resolver.sourceExts,
		'cjs'
	],
};