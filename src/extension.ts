import * as vscode from 'vscode'
import { rainborColors } from "./rainbow";
import { decorate } from './decorator';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vscode-rainbow-string" is now active!');

    let config = vscode.workspace.getConfiguration("rainbowString") as any as { extensions: string[] }

    vscode.workspace.onDidChangeConfiguration(() => {
        config = vscode.workspace.getConfiguration("rainbowString") as any as { extensions: string[] }
    });

    vscode.workspace.onDidSaveTextDocument(e => {
        var file = vscode.window.activeTextEditor.document.fileName;
        if (config.extensions.some(x => file.endsWith(x))) {
            decorate()
        }
    })

    vscode.workspace.onDidOpenTextDocument(e => {
        var file = vscode.window.activeTextEditor.document.fileName;
        if (config.extensions.some(x => file.endsWith(x))) {
            decorate()
        }
    })
}

export function deactivate() { }