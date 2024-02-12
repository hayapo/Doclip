export interface DocInfo {
	id: string;
	title: string;
	originalTitle: string;
	url: string;
}

export interface DocInfoBucket {
	data: DocInfo[];
}
