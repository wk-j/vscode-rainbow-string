'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "vscode-rainbow-string" is now active!');

    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        vscode.window.showInformationMessage('Hello World!');
    });

    let rainbow = vscode.window.createTextEditorDecorationType({
        //
    });

    vscode.workspace.onDidChangeTextDocument(event => {

    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}