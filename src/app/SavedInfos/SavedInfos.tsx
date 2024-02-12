import { useAtom } from 'jotai';
import {
	bucketAtom,
	bucketDataAtom,
	currentDocInfoAtom,
} from '../../atoms/atoms';
import { GravityUiArrowsRotateRight, GravityUiTrashBin } from '../../icons';
import { DocInfo } from '../../types';

function SavedInfoList() {
	const [bucket] = useAtom(bucketAtom);
	const [bucketData, setBucketData] = useAtom(bucketDataAtom);
	const [currentDocInfo] = useAtom(currentDocInfoAtom);

	/* 
		TODO: implement feature that only allows document to be saved
		例えば，/docs や /doc, zenn.dev/{username}/booksを含むurlや **.gitbooks.io などのドメインのみを保存できるようにする
	*/

	/* 
		TODO: implement feature that only allows same document to be updated
		例えば，同じURLのドキュメントが保存されている場合，そのドキュメントを更新することができるようにする
		チャプターだけを更新したい場合などに使える
	*/

	// Clear specific data from storage
	const clearData = (docInfo: DocInfo) => {
		if (!bucketData) return;

		const newBucketData = bucketData.filter((d) => d.url !== docInfo.url);

		if (newBucketData.length === 0) {
			bucket.clear();
			setBucketData([]);
		} else {
			bucket.set({ data: newBucketData });
			setBucketData(newBucketData);
		}
	};

	// update specific data from storage
	const updateData = (id: string, newInfo: DocInfo) => {
		if (!bucketData) return;

		const newBucketData = bucketData.map((d) => {
			if (d.id === id) {
				return {
					...d,
					originalTitle: newInfo.title,
					url: newInfo.url,
				};
			}
			return d;
		});
		bucket.set({ data: newBucketData });
	};

	return (
		<ul className="w-full flex flex-col gap-3 my-[-3]">
			{/* bucketData.lengthが1以上であることは保証されている */}
			{bucketData?.map((docInfo) => (
				<li
					key={docInfo.title}
					className="flex gap-5 justify-between items-center"
				>
					<a
						href={docInfo.url}
						target="_blank"
						rel="noreferrer"
						className="text-blue-500 hover:underline"
					>
						{docInfo.title}
					</a>
					<div className="flex gap-5">
						{/* <button
							type="button"
							title="update data"
							aria-label="Update data"
							className="hover:text-gray-500"
							onClick={() => updateData(docInfo.id, currentDocInfo)}
						>
							<GravityUiArrowsRotateRight />
						</button> */}
						<button
							type="button"
							title="Clear data"
							aria-label="Clear data"
							className="hover:text-red-500 hover:animate-pulse"
							onClick={() => clearData(docInfo)}
						>
							<GravityUiTrashBin />
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}

export function SavedInfos() {
	const [bucket] = useAtom(bucketAtom);
	const [bucketData, setBucketData] = useAtom(bucketDataAtom);

	// Clear all data from storage
	const clearAllData = () => {
		bucket.clear();
		setBucketData([]);
	};

	return (
		<div className="w-full h-full flex flex-col gap-3 items-center justify-between">
			{bucketData.length !== 0 && (
				<>
					<SavedInfoList />
					<button
						type="button"
						aria-label="Clear all data"
						className="bg-red-600 p-2 rounded-md mb-3 font-bold text-gray-100"
						onClick={() => clearAllData()}
					>
						Clear all data
					</button>
				</>
			)}
		</div>
	);
}
