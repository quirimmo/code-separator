'use strict';

import { Disposable, languages, TextDocument, Position, CompletionItem, commands } from 'vscode';
import { CodeSeparator } from './CodeSeparator';

export class CodeSeparatorController {
	private codeSeparator: CodeSeparator;
	private _disposable: Disposable;

	constructor(codeSeparator: CodeSeparator) {
		this.codeSeparator = codeSeparator;
		let subscriptions: Disposable[] = [];
		this._registerCommand();
		this._disposable = Disposable.from(...subscriptions);
	}

	public dispose() {
		this._disposable.dispose();
	}

	private _registerCommand() {
		commands.registerCommand('codeseparator.codeseparator', () => {
			this.codeSeparator.executeCommand();
		});
	}
}
