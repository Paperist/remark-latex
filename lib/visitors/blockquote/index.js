"use strict";
function blockquote(node) {
    const result = `\\begin{quote}\n${this.all(node).join('\n')}\n\\end{quote}`;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = blockquote;
