"use strict";
function linkReference(node) {
    const identifier = node.identifier.toUpperCase();
    const def = this.definitions[identifier] || {};
    const bind = Object.assign({
        href: def.link,
        alt: def.title,
    }, node);
    return this.visitors.image.call(this, bind);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = linkReference;
