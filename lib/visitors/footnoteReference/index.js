"use strict";
function footnoteReference(node) {
    return `\\footnotemark[${node.identifier}]`;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = footnoteReference;
