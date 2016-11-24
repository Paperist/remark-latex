"use strict";
const visit = require('unist-util-visit');
function table(node, parent) {
    const align = node.align.concat();
    node.align =
        (align.shift() || 'l')[0].toLowerCase() + '|' +
            align.map((align) => (align || 'l')[0]).join('').toLowerCase();
    node.label = '';
    node.caption = '';
    const nextNodeIdx = node.index + 1;
    const nextNode = parent.children[nextNodeIdx];
    if (nextNode && nextNode.type === 'tableCaption') {
        visit(nextNode, 'crossReferenceLabel', (crNode) => {
            node.label += this.convert(crNode);
        });
        const caption = this.all(nextNode).join('').replace(/\n/g, '')
            .replace(/^(?:\s*table)?\s*:/i, '').trim();
        node.caption = caption;
    }
    node.value = this.all(node).join('\n');
    return node;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = table;
