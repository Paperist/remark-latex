"use strict";
const crossReferenceLabel_1 = require('../crossReferenceLabel');
const visit = require('unist-util-visit');
function heading(node) {
    const results = [];
    visit(node, 'crossReferenceLabel', (node) => {
        results.push(crossReferenceLabel_1.default.call(this, node));
    });
    const caption = this.all(node).join('').replace(/\n/g, '')
        .replace(/^(?:\s*table)?\s*:/i, '').trim();
    results.unshift(`\\caption{${caption}}`);
    return results.join('');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = heading;
