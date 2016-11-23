"use strict";
function emphasis(node) {
    return `\\emph{${this.all(node).join('')}}`;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = emphasis;
