import { getBucket } from '@extend-chrome/storage';
import { atom } from 'jotai';
import { DocInfo, DocInfoBucket } from '../types';

export const firstCallAtom = atom(true);
export const editingAtom = atom(false);
export const sameUrlAtom = atom(false);
export const showSameUrlWarnAtom = atom(false);
export const customTitleAtom = atom('');

// Atoms for use sync storage
export const bucketAtom = atom(getBucket<DocInfoBucket>('doc-info', 'sync'));
export const bucketDataAtom = atom<DocInfo[]>([]);

// Atom for current tab doc info
export const currentDocInfoAtom = atom<DocInfo>({
	id: '',
	title: '',
	originalTitle: '',
	url: '',
});
