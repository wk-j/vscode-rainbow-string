function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF"
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1)
}

function RGB2Color(r, g, b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b)
}

function* makeColorGradient(frequency1, frequency2, frequency3, phase1, phase2, phase3, center = 128, width = 127, len = 50) {
    for (var i = 0; i < len; ++i) {
        var red = Math.sin(frequency1 * i + phase1) * width + center
        var grn = Math.sin(frequency2 * i + phase2) * width + center
        var blu = Math.sin(frequency3 * i + phase3) * width + center
        yield RGB2Color(red, grn, blu)
    }
}

// export const rainborColors = makeColorGradient(.3, .3, .3, 0, 2, 4)
export const rainborColors = makeColorGradient(.2, .2, .2, 0, 2, 4)