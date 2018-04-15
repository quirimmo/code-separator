'use strict';

import { SnippetString, CompletionItem, window } from 'vscode';

export class CodeSeparator {
	private snippet: SnippetString;

	constructor() {
		this._setupSnippet();
	}

	public getCompletionItem(): CompletionItem {
		let completionItem: CompletionItem = new CompletionItem('id');
		completionItem.detail = 'test javascript detail';
		completionItem.documentation = 'mde\r\nadfdsf nadfdsf nadfdsf nadfdsf nadfdsf nadfdsf';
		completionItem.filterText = 'test';
		completionItem.insertText = this.snippet;
		completionItem.label = 'test';
		return completionItem;
	}

	public getSnippet() {
		return this.snippet;
	}

	public registerCommand() {
		window.activeTextEditor.insertSnippet(this.snippet);
	}

	private _setupSnippet() {
		this.snippet = new SnippetString('// = ');
		this.snippet.appendVariable('bla', 'quirino');
	}
}
