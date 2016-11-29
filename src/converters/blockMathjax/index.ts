import LaTeXCompiler from '../../LaTeXCompiler';
import visit = require('unist-util-visit');

export default function blockMathjax(
  this: LaTeXCompiler,
  node: any,
  parent: any,
) {
  node.label = '';

  const nextNodeIdx = node.index + 1;
  const nextNode = parent.children[nextNodeIdx];

  visit(nextNode, 'crossReferenceLabel', (crNode: any) => {
    node.label += this.convert(crNode);
  });

  return node;
}
