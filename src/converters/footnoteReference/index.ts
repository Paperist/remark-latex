import { MDAST } from 'mdast';
import LaTeXCompiler from '../../LaTeXCompiler';

export default function footnoteReference(
  this: LaTeXCompiler,
  node: MDAST.FootnoteReference
) {
  const footnotes = this.footnotes;
  const identifiers = footnotes.map(f => f.identifier);

  node.identifier = `${identifiers.indexOf(`${node.identifier}`) + 1}`;
  return node;
}
