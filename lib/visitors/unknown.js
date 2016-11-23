"use strict";
function unknown(node) {
    const content = ('children' in node) ? this.all(node).join('') : node.value;
    return content;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = unknown;
