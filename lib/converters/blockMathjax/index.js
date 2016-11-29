"use strict";
const visit = require('unist-util-visit');
function blockMathjax(node, parent) {
    node.label = '';
    const nextNodeIdx = node.index + 1;
    const nextNode = parent.children[nextNodeIdx];
    visit(nextNode, 'crossReferenceLabel', (crNode) => {
        node.label += this.convert(crNode);
    });
    return node;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = blockMathjax;
