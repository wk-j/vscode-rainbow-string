import * as vscode from "vscode"
import { rainborColors } from "./rainbow";

let colors = Array.from(rainborColors)

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function decorate() {
    let editor = vscode.window.activeTextEditor;
    let text = editor.document.getText()
    let rainbows = colors.map(x => vscode.window.createTextEditorDecorationType({ color: x }))
    let regex = /(?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)')/g;
    let decorators = colors.map(color => [])
    let match: RegExpMatchArray;
    let offset: number = getRandomInt(0, colors.length);

    while ((match = regex.exec(text))) {
        let chars: string[] = [...(match[1] || match[2])];
        offset--;

        if (chars.length > 0) {
            chars.forEach((_, i) => {
                var matchIndex = match.index + 1
                let rainbowIndex =  Math.abs((i + offset) % colors.length);
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
