'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';
import { window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument, languages, CompletionItem, Position, workspace, Uri, TextEditor, SnippetString, InputBoxOptions } from 'vscode';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {
export function activate(context: ExtensionContext) {

    let codeSeparator = new CodeSeparatorController();

    // // Use the console to output diagnostic information (console.log) and errors (console.error).
    // // This line of code will only be executed once when your extension is activated.
    // console.log('Congratulations, your extension "WordCount" is now active!');

    // // create a new word counter
    // let wordCounter = new WordCounter();
    // let controller = new WordCounterController(wordCounter);

    // // Add to a list of disposables which are disposed when this extension is deactivated.
    // context.subscriptions.push(controller);
    // context.subscriptions.push(wordCounter);

    // let snippet: SnippetString = new SnippetString('// = ');
    // snippet.appendVariable('bla', 'quirino');
    // // The most simple completion item provider which 
    // // * registers for text files (`'plaintext'`), and
    // // * only return the 'Hello World' completion
    // languages.registerCompletionItemProvider('*', {
    //     provideCompletionItems(document: TextDocument, position: Position) {
    //         // console.log(workspace.getConfiguration('helloworldextension'));
    //         var completionItems: CompletionItem[] = [];
    //         var completionItem: CompletionItem = new CompletionItem("id");
    //         completionItem.detail = "test javascript detail";
    //         completionItem.documentation = "mde\r\nadfdsf nadfdsf nadfdsf nadfdsf nadfdsf nadfdsf";
    //         completionItem.filterText = "test";
    //         completionItem.insertText = snippet;
    //         completionItem.label = "test";
    //         completionItems.push(completionItem);
    //         return completionItems;
    //     }
    // });

    // // adding command
    // let sub = context.subscriptions;
    // commands.registerCommand('helloworldextension.test', testCommand);
    // function testCommand() {
    //     window.showInputBox({
    //         prompt: "Label: ",
    //         placeHolder: "(placeholder)"
    //     }).then(value => {
    //         console.log(value);
    //         window.activeTextEditor.insertSnippet(snippet);
    //     });
    // }
}

// this method is called when your extension is deactivated
export function deactivate() {
}

export class CodeSeparatorController {
    
    private _disposable: Disposable;

    constructor() {
        // subscribe to selection change and editor activation events
        let subscriptions: Disposable[] = [];
        // create a combined disposable from both event subscriptions
        this._disposable = Disposable.from(...subscriptions);
    }

    public dispose() {
        this._disposable.dispose();
    }

    private _onEvent() {
        // this._wordCounter.updateWordCount();
    }
}





export class WordCounter {

    private _statusBarItem: StatusBarItem;

    public updateWordCount() {

        // Create as needed
        if (!this._statusBarItem) {
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        }

        // Get the current text editor
        let editor = window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }

        let doc = editor.document;

        // Only update status if an Markdown file
        if (doc.languageId === "markdown") {
            let wordCount = this._getWordCount(doc);

            // Update the status bar
            this._statusBarItem.text = wordCount !== 1 ? `$(pencil) ${wordCount} Words` : '$(pencil) 1 Word';
            this._statusBarItem.show();
        } else {
            this._statusBarItem.hide();
        }
    }

    public _getWordCount(doc: TextDocument): number {

        let docContent = doc.getText();

        // Parse out unwanted whitespace so the split is accurate
        docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
        docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        let wordCount = 0;
        if (docContent != "") {
            wordCount = docContent.split(" ").length;
        }

        return wordCount;
    }

    public dispose() {
        this._statusBarItem.dispose();
    }
}

class WordCounterController {

    private _wordCounter: WordCounter;
    private _disposable: Disposable;

    constructor(wordCounter: WordCounter) {
        this._wordCounter = wordCounter;

        // subscribe to selection change and editor activation events
        let subscriptions: Disposable[] = [];
        window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
        window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);

        // update the counter for the current file
        this._wordCounter.updateWordCount();

        // create a combined disposable from both event subscriptions
        this._disposable = Disposable.from(...subscriptions);
    }

    public dispose() {
        this._disposable.dispose();
    }

    private _onEvent() {
        this._wordCounter.updateWordCount();
    }
}
