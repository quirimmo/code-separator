import * as assert from 'assert';
import * as vscode from 'vscode';
import {activate, deactivate} from './../src/extension';

suite('Extension', () => {
	suite('activate', () => {
		test('should be a function', () => {
			assert.strictEqual(typeof activate, 'function');
		});
	});

	suite('deactivate', () => {
		test('should be a function', () => {
			assert.strictEqual(typeof deactivate, 'function');
		});
	});
});
