import * as vscode from 'vscode'
import { rainborColors } from "./rainbow";
import { decorate } from './decorator';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vscode-rainbow-string" is now active!');

    vscode.workspace.onDidSaveTextDocument(e => {
        decorate()
    })

    vscode.workspace.onDidOpenTextDocument(e => {
        decorate()
    })
}

export function deactivate() { }