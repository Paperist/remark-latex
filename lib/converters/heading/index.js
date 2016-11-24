"use strict";
const visit = require('unist-util-visit');
function heading(node) {
    node.label = '';
    visit(node, 'crossReferenceLabel', (crNode) => {
        node.label += this.convert(crNode);
    });
    node.value = this.all(node).join('');
    return node;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = heading;
