'use strict';

import { Disposable, languages, TextDocument, Position, workspace, CompletionItem, commands } from 'vscode';
import { CodeSeparator } from './CodeSeparator';

export class CodeSeparatorController {
	private codeSeparator: CodeSeparator;
	private _disposable: Disposable;

	constructor(codeSeparator: CodeSeparator) {
		this.codeSeparator = codeSeparator;
		// subscribe to selection change and editor activation events
		let subscriptions: Disposable[] = [];

		this._registerCompletion();
		this._registerCommand();

		// create a combined disposable from both event subscriptions
		this._disposable = Disposable.from(...subscriptions);
	}

	public dispose() {
		this._disposable.dispose();
	}

	private _registerCompletion() {
		let self = this;
		languages.registerCompletionItemProvider('*', {
			provideCompletionItems: onProvideCompletionItems
		});

		function onProvideCompletionItems(document: TextDocument, position: Position) {
			console.dir(workspace.getConfiguration('helloworldextension'));
			var completionItems: CompletionItem[] = [self.codeSeparator.getCompletionItem()];
			return completionItems;
		}
	}

	private _registerCommand() {
		commands.registerCommand('codeseparator.codeseparator', () => {
			this.codeSeparator.registerCommand();
		});
	}
}
