import LaTeXCompiler from '../../LaTeXCompiler';
import crossReferenceLabel from '../crossReferenceLabel';
import visit = require('unist-util-visit');

const typeList = [
  'section',
  'subsection',
  'subsubsection',
  'paragraph',
  'subparagraph',
];
Object.freeze(typeList);

export default function heading(
  this: LaTeXCompiler,
  node: any,
) {
  const type = typeList[Math.min(typeList.length, node.depth) - 1];
  const results: string[] = [];

  visit(node, 'crossReferenceLabel', (node: any) => {
    results.push(crossReferenceLabel.call(this, node));
  });

  const title = this.all(node).join('').trim();

  results.unshift(`\\${type}{${title}}`);

  return results.join('');
}
