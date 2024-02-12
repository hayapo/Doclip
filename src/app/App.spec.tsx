import '@testing-library/jest-dom';
import { chrome } from 'jest-chrome';

test('demo 1', () => {
	const manifest: chrome.runtime.Manifest = {
		name: 'my chrome extension',
		manifest_version: 2,
		version: '1.0.0',
	};

	chrome.runtime.getManifest.mockImplementation(() => manifest);

	expect(chrome.runtime.getManifest()).toEqual(manifest);
});
