"use strict";
function link(node) {
    const result = `\\href{${node.url}}{${this.all(node).join('')}}`;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = link;
