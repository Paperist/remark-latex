"use strict";
function blockquote(node) {
    node.value = this.all(node).join('\n');
    return node;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = blockquote;
