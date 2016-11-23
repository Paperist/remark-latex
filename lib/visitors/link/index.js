"use strict";
function link(node) {
    const result = `\\href{${node.href}}{${this.all(node).join('')}}`;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = link;
