'use strict';

import {
	window,
	commands,
	Disposable,
	ExtensionContext,
	StatusBarAlignment,
	StatusBarItem,
	TextDocument,
	languages,
	CompletionItem,
	Position,
	workspace,
	Uri,
	TextEditor,
	SnippetString,
	InputBoxOptions
} from 'vscode';

// this method is called when your extension is activated, so the very first time the command is executed
export function activate(context: ExtensionContext) {
	let codeSeparatorController = new CodeSeparatorController(new CodeSeparator());
	context.subscriptions.push(codeSeparatorController);
}

// this method is called when your extension is deactivated
export function deactivate() {}

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

// export class WordCounter {
// 	private _statusBarItem: StatusBarItem;

// 	public updateWordCount() {
// 		// Create as needed
// 		if (!this._statusBarItem) {
// 			this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
// 		}

// 		// Get the current text editor
// 		let editor = window.activeTextEditor;
// 		if (!editor) {
// 			this._statusBarItem.hide();
// 			return;
// 		}

// 		let doc = editor.document;

// 		// Only update status if an Markdown file
// 		if (doc.languageId === 'markdown') {
// 			let wordCount = this._getWordCount(doc);

// 			// Update the status bar
// 			this._statusBarItem.text = wordCount !== 1 ? `$(pencil) ${wordCount} Words` : '$(pencil) 1 Word';
// 			this._statusBarItem.show();
// 		} else {
// 			this._statusBarItem.hide();
// 		}
// 	}

// 	public _getWordCount(doc: TextDocument): number {
// 		let docContent = doc.getText();

// 		// Parse out unwanted whitespace so the split is accurate
// 		docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
// 		docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
// 		let wordCount = 0;
// 		if (docContent != '') {
// 			wordCount = docContent.split(' ').length;
// 		}

// 		return wordCount;
// 	}

// 	public dispose() {
// 		this._statusBarItem.dispose();
// 	}
// }

// class WordCounterController {
// 	private _wordCounter: WordCounter;
// 	private _disposable: Disposable;

// 	constructor(wordCounter: WordCounter) {
// 		this._wordCounter = wordCounter;

// 		// subscribe to selection change and editor activation events
// 		let subscriptions: Disposable[] = [];
// 		window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
// 		window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);

// 		// update the counter for the current file
// 		this._wordCounter.updateWordCount();

// 		// create a combined disposable from both event subscriptions
// 		this._disposable = Disposable.from(...subscriptions);
// 	}

// 	public dispose() {
// 		this._disposable.dispose();
// 	}

// 	private _onEvent() {
// 		this._wordCounter.updateWordCount();
// 	}
// }
