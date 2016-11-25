"use strict";
const visit = require('unist-util-visit');
function blockMathjax(node) {
    node.label = '';
    visit(node, 'crossReferenceLabel', (crNode) => {
        node.label += this.convert(crNode);
    });
    return node;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = blockMathjax;
