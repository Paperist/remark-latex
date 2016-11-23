"use strict";
function strikethrough(node) {
    return `\\sout{${this.all(node).join('')}}`;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = strikethrough;
