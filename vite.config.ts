import { join, resolve } from 'path';
import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';
import { defineConfig } from 'vite';
import manifest from './src/manifest';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
		crx({ manifest }),
	],
});
