"use strict";
const crossReferenceLabel_1 = require('../crossReferenceLabel');
const visit = require('unist-util-visit');
const typeList = [
    'section',
    'subsection',
    'subsubsection',
    'paragraph',
    'subparagraph',
];
Object.freeze(typeList);
function heading(node) {
    const type = typeList[Math.min(typeList.length, node.depth) - 1];
    const results = [];
    visit(node, 'crossReferenceLabel', (node) => {
        results.push(crossReferenceLabel_1.default.call(this, node));
    });
    const title = this.all(node).join('').trim();
    results.unshift(`\\${type}{${title}}`);
    return results.join('');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = heading;
