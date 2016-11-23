"use strict";
function code(node) {
    node.value = (node.value) ? node.value.replace(/\t/g, '\x20\x20') : '';
    const results = [
        '\\begin{verbatim}',
        this.visitors.text.call(this, node),
        '\\end{verbatim}',
    ];
    return results.join('\n');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = code;
