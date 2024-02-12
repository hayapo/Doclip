import { useAtom } from 'jotai';
import { useEffect } from 'react';
import {
	bucketAtom,
	bucketDataAtom,
	currentDocInfoAtom,
	editingAtom,
	sameUrlAtom,
	showSameUrlWarnAtom,
} from '../../atoms/atoms';
import { GravityUiCirclePlusFill, GravityUiPencilToSquare } from '../../icons';
import { TitleCustomForm } from './TitleCustomForm';

export function SaveCurrentPageInfo() {
	const [bucket] = useAtom(bucketAtom);
	const [bucketData, setBucketData] = useAtom(bucketDataAtom);
	const [currentDocInfo] = useAtom(currentDocInfoAtom);
	const [isEditing, setIsEditing] = useAtom(editingAtom);
	const [isSameUrl, setIsSameUrl] = useAtom(sameUrlAtom);
	const [showSameUrlWarn, setShowSameUrlWarn] = useAtom(showSameUrlWarnAtom);

	// Check if a URL identical to currentDocInfo exists within bucketData
	useEffect(() => {
		setShowSameUrlWarn(false);
		setIsSameUrl(false);
		if (bucketData.some((d) => d.url === currentDocInfo.url)) {
			setIsSameUrl(true);
			return;
		}
	}, [bucketData, setIsSameUrl, setShowSameUrlWarn, currentDocInfo]);

	// Save current doc info to state
	const saveCurrentDocInfo = () => {
		// if there is no bucket data, set the currentDocInfo as the first data
		if (!bucketData) {
			bucket.set({ data: [currentDocInfo] });
			setBucketData([currentDocInfo]);
		} else {
			// prevent same doc save
			if (bucketData.some((d) => d.url === currentDocInfo.url)) {
				setShowSameUrlWarn(true);
				return;
			}
			// save the currentDocInfo and prev infos to the bucket data
			bucket.set({ data: [...bucketData, currentDocInfo] });
			setBucketData([...bucketData, currentDocInfo]);
		}
	};

	useEffect(() => {
		console.log('isSameUrl', isSameUrl);
		console.log('showSameUrlWarn', showSameUrlWarn);
	}, [isSameUrl, showSameUrlWarn]);

	return (
		<>
			<div className="flex gap-5 items-center">
				<span>{currentDocInfo.title}</span>
				<button
					type="button"
					title="Edit title"
					onClick={() => setIsEditing(!isEditing)}
				>
					<GravityUiPencilToSquare />
				</button>
			</div>
			{isEditing && <TitleCustomForm />}
			{bucketData && bucketData.length === 5 ? (
				<p className="text-red-500">You can only save 5 documents</p>
			) : (
				<>
					<button
						type="submit"
						aria-label="Save current page"
						onClick={() => saveCurrentDocInfo()}
					>
						<GravityUiCirclePlusFill className="fill-current text-green-500" />
					</button>
					{isSameUrl && showSameUrlWarn && (
						<p className="text-red-500 text-lg">Cannot save the same url !!</p>
					)}
				</>
			)}
		</>
	);
}
