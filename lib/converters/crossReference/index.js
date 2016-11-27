"use strict";
function crossReference(node) {
    const refs = [];
    const cites = [];
    const ids = node.identifier.split(';')
        .map((ref) => ref.trim())
        .filter((ref) => ref.match(/^@/))
        .map((ref) => ref.replace(/^@/, ''));
    for (const id of ids) {
        if (id.match(/^(?:fig|tbl|sec|eq|lst):/)) {
            refs.push(id);
        }
        else {
            cites.push(id);
        }
    }
    return Object.assign({}, node, { refs, cites });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = crossReference;
