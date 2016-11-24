"use strict";
function footnote(node) {
    const footnotes = this.footnotes;
    const identifiers = footnotes.map((f) => f.identifier);
    node.identifier = identifiers.indexOf(`${node.identifier}`) + 1;
    return node;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = footnote;
