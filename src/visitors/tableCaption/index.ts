import LaTeXCompiler from '../../LaTeXCompiler';
import crossReferenceLabel from '../crossReferenceLabel';
import visit = require('unist-util-visit');

export default function heading(
  this: LaTeXCompiler,
  node: any,
) {
  const results: string[] = [];

  visit(node, 'crossReferenceLabel', (node: any) => {
    results.push(crossReferenceLabel.call(this, node));
  });

  const caption =
    this.all(node).join('').replace(/\n/g, '')
      .replace(/^(?:\s*table)?\s*:/i, '').trim();
  results.unshift(`\\caption{${caption}}`);

  return results.join('');
}
