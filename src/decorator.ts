import * as vscode from "vscode"
import { rainborColors } from "./rainbow";

let colors = Array.from(rainborColors)

export function decorate() {
    let editor = vscode.window.activeTextEditor;
    let text = editor.document.getText()
    let rainbows = colors.map(x => vscode.window.createTextEditorDecorationType({ color: x }))
    let regex = /"(.*?)"/g
    let decorators = colors.map(color => [])
    let match: RegExpMatchArray;

    while ((match = regex.exec(text))) {
        let chars = [...match[1]]

        if (chars.length > 6) {
            chars.forEach((_, i) => {
                var matchIndex = match.index + 1
                let rainbowIndex = i % colors.length
                let rainbow = rainbows[rainbowIndex]
                let startIndex = matchIndex + i
                let endIndex = matchIndex + i + 1
                let start = editor.document.positionAt(startIndex)
                let end = editor.document.positionAt(endIndex)
                decorators[rainbowIndex].push(new vscode.Range(start, end))
            });
        }
    }
    decorators.forEach((d, index) => {
        editor.setDecorations(rainbows[index], d)
    })
}