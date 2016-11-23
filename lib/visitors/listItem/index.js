"use strict";
function listItem(node, parent) {
    const isSingle = !parent.loose &&
        node.children.length === 1 &&
        node.children[0].children;
    const item = this.all((isSingle) ? node.children[0] : node)
        .join((isSingle) ? '' : '\n');
    const result = `\\item\x20${item}\n`;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = listItem;
