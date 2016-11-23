"use strict";
function text(node) {
    return escapeLaTeX(convertQuote(node.value));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = text;
function escapeLaTeX(text) {
    const escapedText = text.replace(/[\{\}#\$%&_]/g, '\\$&')
        .replace(/[|]/g, '\\verb+$&+')
        .replace(/[<>^~]/g, '\\verb|$&|')
        .replace(/\\\\/g, '\\verb|\\|');
    return escapedText;
}
function convertQuote(text) {
    const convertedText = text.replace(/'(.+?)'/g, '`$1\'')
        .replace(/"(.+?)"/g, '``$1\'\'');
    return convertedText;
}
