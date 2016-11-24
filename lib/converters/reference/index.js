"use strict";
function reference(node) {
    const identifier = node.identifier.toUpperCase();
    const def = this.definitions[identifier] || {};
    const bind = Object.assign({
        url: def.url,
        alt: def.title,
    }, node);
    bind.type = bind.type.replace('Reference', '');
    bind.value = this.all(bind).join('');
    return bind;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reference;
