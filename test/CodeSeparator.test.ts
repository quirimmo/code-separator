import * as assert from 'assert';
import * as vscode from 'vscode';
import CodeSeparator from './../src/CodeSeparator';

const instance: CodeSeparator = new CodeSeparator();

suite('Extension', () => {
	suite('CodeSeparator', () => {
		test('should be a function', () => {
			assert.strictEqual(typeof CodeSeparator, 'function');
		});

		test('should expose the public methods', () => {
			assert.strictEqual(typeof instance.executeCommand, 'function');
		});
	});
});
