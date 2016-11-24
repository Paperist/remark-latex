import LaTeXCompiler from '../../LaTeXCompiler';

export default function footnote(
  this: LaTeXCompiler,
  node: any,
) {
  const footnotes = this.footnotes;
  const identifiers: any[] = footnotes.map((f) => f.identifier);

  node.identifier = identifiers.indexOf(`${node.identifier}`) + 1;
  return node;
}
