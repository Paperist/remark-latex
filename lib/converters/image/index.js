"use strict";
function image(node, parent) {
    node.caption = node.title || node.alt;
    node.label = node.label || '';
    node.config = this.options.imageConfig || 'width=5cm,height=5cm,keepaspectratio';
    const nextNodeIdx = node.index + 1;
    const nextNode = parent.children[nextNodeIdx];
    if (nextNode && nextNode.type === 'crossReferenceLabel') {
        node.label += this.convert(nextNode);
    }
    return node;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = image;
