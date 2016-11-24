"use strict";
function blockquote(node) {
    node.value = this.all(node).join('').trim().replace(/\t/g, '\x20\x20');
    return node;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = blockquote;
