"use strict";
function linkReference(node) {
    const identifier = node.identifier.toUpperCase();
    const def = this.definitions[identifier] || {};
    const bind = Object.assign({
        url: def.url,
        alt: def.title,
    }, node);
    return this.visitors.link.call(this, bind);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = linkReference;
