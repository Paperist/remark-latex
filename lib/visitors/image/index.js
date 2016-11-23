"use strict";
const crossReferenceLabel_1 = require('../crossReferenceLabel');
function image(node, parent) {
    const title = node.title || node.alt;
    let label = '';
    const config = 'width=5cm,height=5cm,keepaspectratio';
    const nextNodeIdx = parent.children.indexOf(node) + 1;
    const nextNode = parent.children[nextNodeIdx];
    if (nextNode && nextNode.type === 'crossReferenceLabel') {
        label = crossReferenceLabel_1.default.call(this, nextNode);
    }
    const results = [
        '\\begin{figure}[tb]',
        '\\begin{center}',
        `\\includegraphics[${config}]{${node.url}}`,
        `\\caption{${title.trim()}}`,
        ((label) ? label : ''),
        '\\end{center}',
        '\\end{figure}',
    ];
    return results.join('\n');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = image;
