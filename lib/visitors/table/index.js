"use strict";
const tableCaption_1 = require('../tableCaption');
function table(node, parent) {
    const rows = node.children;
    const rowsLength = rows.length;
    const align = node.align.slice();
    const alignLength = align.length;
    const alignStr = (align.shift() || 'l')[0].toLowerCase() + '|' +
        align.map((align) => (align || 'l')[0]).join('').toLowerCase();
    const results = [
        '\\begin{table}[tb]',
        '\\begin{center}',
    ];
    const nextNodeIdx = parent.children.indexOf(node) + 1;
    const nextNode = parent.children[nextNodeIdx];
    if (nextNode && nextNode.type === 'tableCaption') {
        results.push(tableCaption_1.default.call(this, nextNode));
    }
    results.push(`\\begin{tabular}{${alignStr}}`);
    for (let idx = 0; idx < rowsLength; idx++) {
        if (idx === 0) {
            results.push('\\hline\\hline');
        }
        const cells = rows[idx].children;
        const cellTeX = [];
        for (let idx = 0; idx < alignLength; idx++) {
            const cell = cells[idx];
            cellTeX.push((cell) ? this.all(cell).join('\x20') : '');
        }
        results.push(cellTeX.join('\x20&\x20'));
        results.push('\\\\');
        results.push('\\hline');
    }
    results.push(...[
        '\\end{tabular}',
        '\\end{center}',
        '\\end{table}',
    ]);
    return results.join('\n');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = table;
