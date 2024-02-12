import { Provider } from 'jotai';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import './styles/global.css';

createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider>
			<App />
		</Provider>
	</React.StrictMode>,
);
