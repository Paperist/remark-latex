"use strict";
function footnote(node) {
    const footnotes = this.footnotes;
    const identifiers = footnotes.map((f) => f.identifier);
    let identifier = 1;
    while (identifiers.indexOf(`${identifier}`) !== -1) {
        identifier++;
    }
    footnotes.push({
        type: 'footnoteDefinition',
        identifier: `${identifier}`,
        children: node.children,
        position: node.position,
    });
    return {
        type: 'footnoteReference',
        identifier: `${identifier}`,
        position: node.position,
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = footnote;
