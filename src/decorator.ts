import * as vscode from "vscode"
import { rainborColors } from "./rainbow";
import { clearLine } from "readline";

let colors = Array.from(rainborColors)

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findCommentIndexs(buffer: string) {
    var comment = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm
    var match: RegExpMatchArray
    var indexs = []

    while ((match = comment.exec(buffer))) {
        var chars = match[0]
        var index = match.index;
        for (var c of chars) {
            indexs.push(index)
            index += 1
        }
    }
    return indexs;
}

function notContains<T>(datas: Array<T>, value: T) {
    return datas.indexOf(value) == -1;
}

export function decorate() {
    let editor = vscode.window.activeTextEditor;
    let text = editor.document.getText()
    let rainbows = colors.map(x => vscode.window.createTextEditorDecorationType({ color: x }))
    let regex = /(?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)')/g;
    let decorators = colors.map(color => [])
    let match: RegExpMatchArray;
    let offset: number = getRandomInt(0, colors.length);
    let comments = findCommentIndexs(text)

    while ((match = regex.exec(text))) {
        let chars: string[] = [...(match[1] || match[2])];
        offset--;

        let startWord = match.index + 1
        let endWord = startWord + chars.length

        if (notContains(comments, startWord) && notContains(comments, endWord)) {
            chars.forEach((_, i) => {
                var matchIndex = match.index + 1
                let rainbowIndex = Math.abs((i + offset) % colors.length);
                let startIndex = matchIndex + i
                let endIndex = matchIndex + i + 1
                let start = editor.document.positionAt(startIndex)
                let end = editor.document.positionAt(endIndex)

                if (notContains(comments, startIndex) && notContains(comments, endIndex)) {
                    decorators[rainbowIndex].push(new vscode.Range(start, end))
                }
            });
        }
    }
    decorators.forEach((d, index) => {
        editor.setDecorations(rainbows[index], d)
    })
}
