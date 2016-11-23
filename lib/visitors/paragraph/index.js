"use strict";
function paragraph(node) {
    const content = this.all(node).join('').trim().replace(/\t/g, '\x20\x20');
    return content;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = paragraph;
