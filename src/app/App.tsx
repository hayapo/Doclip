import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
	bucketAtom,
	bucketDataAtom,
	currentDocInfoAtom,
	firstCallAtom,
} from '../atoms/atoms';
import { TITLE } from '../util/constants';
import { SaveCurrentPageInfo } from './CurrentPageInfo/SaveCurrentPageInfo';
import { SavedInfos } from './SavedInfos/SavedInfos';

function App() {
	// Set extension popup style
	document.body.className = 'w-[30rem] h-[20rem] p-5 bg-white rounded-md';

	const [bucket] = useAtom(bucketAtom);
	const [, setBucketData] = useAtom(bucketDataAtom);
	const [, setCurrentDocInfo] = useAtom(currentDocInfoAtom);
	const [isFirstCall, setIsFirstCall] = useAtom(firstCallAtom);

	useEffect(() => {
		// Load doc info from storage
		(async () => {
			const value = await bucket.get();
			if (value.data) {
				setBucketData(value.data);
			} else {
				setBucketData([]);
			}
		})();

		// Get current tab
		isFirstCall &&
			chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				// if there is a tab, set the current doc info
				if (tabs.length > 0) {
					setCurrentDocInfo({
						id: uuidv4(),
						title: tabs[0].title || '',
						originalTitle: tabs[0].title || '',
						url: tabs[0].url || '',
					});
				}
				setIsFirstCall(false);
			});
	}, [bucket, setBucketData, isFirstCall, setIsFirstCall, setCurrentDocInfo]);

	return (
		<>
			<div className="flex flex-col gap-3 items-center justify-center w-full h-full">
				<header className="text-3xl text-black text-center">{TITLE}</header>
				<SaveCurrentPageInfo />
				<hr className="h-1 w-full boder-2" />
				<SavedInfos />
			</div>
		</>
	);
}

export default App;
