'use strict';

import { SnippetString, CompletionItem, window, commands, workspace } from 'vscode';

export default class CodeSeparator {
	constructor() {}

	public executeCommand(): void {
		let self = this;

		commands.executeCommand('editor.action.commentLine').then(onSuccess, onError);
		function onSuccess() {
			window.activeTextEditor.insertSnippet(self._getSnippet());
		}

		function onError(err) {
			console.error(err);
		}
	}

	private _getSnippet() {
		const SEPARATOR_LENGTH = workspace.getConfiguration('codeseparator').get('separatorLength');
		const SEPARATOR_CHAR = workspace.getConfiguration('codeseparator').get('separatorChar');
		let str = '';
		for (let i = 0; i < SEPARATOR_LENGTH; i++) {
			str += SEPARATOR_CHAR;
		}
		return new SnippetString(str);
	}
}
