import * as vscode from "vscode"
import { rainborColors } from "./rainbow";
import { clearLine } from "readline";

let colors = Array.from(rainborColors)

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function replaceComments(buffer: string) {
    var comment = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm
    return buffer.replace(comment, (x) => {
        var len = x.length
        var r = " ".repeat(len)
        return r
    })
}

function notContains<T>(datas: Array<T>, value: T) {
    return datas.indexOf(value) == -1;
}

export function decorate() {
    let editor = vscode.window.activeTextEditor;
    let allText = editor.document.getText()
    let noCommentText = replaceComments(allText)

    let rainbows = colors.map(x => vscode.window.createTextEditorDecorationType({ color: x }))
    let regex = /(?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)')/g;
    let decorators = colors.map(color => [])
    let match: RegExpMatchArray;
    let offset: number = getRandomInt(0, colors.length);

    while ((match = regex.exec(noCommentText))) {
        let chars: string[] = [...(match[1] || match[2])];
        offset--;

        let startWord = match.index + 1
        let endWord = startWord + chars.length

        chars.forEach((_, i) => {
            var matchIndex = match.index + 1
            let rainbowIndex = Math.abs((i + offset) % colors.length);
            let startIndex = matchIndex + i
            let endIndex = matchIndex + i + 1
            let start = editor.document.positionAt(startIndex)
            let end = editor.document.positionAt(endIndex)
            decorators[rainbowIndex].push(new vscode.Range(start, end))
        });
    }
    decorators.forEach((d, index) => {
        editor.setDecorations(rainbows[index], d)
    })
}
