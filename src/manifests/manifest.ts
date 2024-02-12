import { defineManifest } from '@crxjs/vite-plugin';

const manifest = defineManifest({
	manifest_version: 3,
	name: 'DocuAnchor',
	description:
		'Chrome extension to anchor to specific parts/page of a document',
	version: '0.0.1',
	permissions: ['storage', 'activeTab'],
	action: {
		default_popup: 'index.html',
	},
});

export default manifest;
