"use strict";
function footnote(node) {
    const footnotes = this.footnotes;
    const length = footnotes.length;
    const identifiers = [];
    for (let idx = 0; idx < length; idx++) {
        identifiers[idx] = footnotes[idx].identifier;
    }
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
    return this.visitors.footnoteReference.call(this, {
        type: 'footnoteReference',
        identifier: `${identifier}`,
        position: node.position,
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = footnote;
