"use strict";
function strong(node) {
    return `\\textbf{${this.all(node).join('')}}`;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = strong;
