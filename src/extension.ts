'use strict';

import { ExtensionContext } from 'vscode';
import { CodeSeparatorController } from './CodeSeparatorController';
import CodeSeparator from './CodeSeparator';

// this method is called when your extension is activated, so the very first time the command is executed
export function activate(context: ExtensionContext) {
	let codeSeparatorController = new CodeSeparatorController(new CodeSeparator());
	context.subscriptions.push(codeSeparatorController);
}

// this method is called when your extension is deactivated
export function deactivate() {}
