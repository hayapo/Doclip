import { useAtom } from 'jotai';
import { ChangeEvent, FormEvent } from 'react';
import {
	currentDocInfoAtom,
	customTitleAtom,
	editingAtom,
} from '../../atoms/atoms';
import { GravityUiSquareCheck } from '../../icons';

export function TitleCustomForm() {
	const [currentDocInfo, setCurrentDocInfo] = useAtom(currentDocInfoAtom);
	const [, setIsEditing] = useAtom(editingAtom);
	const [customTitle, setCustomTitle] = useAtom(customTitleAtom);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setCurrentDocInfo({ ...currentDocInfo, title: customTitle });
		setIsEditing(false);
	}

	function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
		setCustomTitle(e.target.value);
	}

	return (
		<form className="flex items-center gap-5" onSubmit={(e) => handleSubmit(e)}>
			<input
				type="text"
				name="custom title"
				autoComplete="off"
				required={true}
				className="bg-gray-200 rounded-md border-2 border-gray-300 p-1"
				onChange={handleChangeTitle}
			/>
			<button type="submit" title="Done">
				<GravityUiSquareCheck />
			</button>
		</form>
	);
}
