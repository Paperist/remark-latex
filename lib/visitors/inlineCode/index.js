"use strict";
function inlineCode(node) {
    return `\\texttt{${this.visitors.text.call(this, node)}}`;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = inlineCode;
