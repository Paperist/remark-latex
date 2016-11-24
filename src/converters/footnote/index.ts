import LaTeXCompiler from '../../LaTeXCompiler';

export default function footnote(
  this: LaTeXCompiler,
  node: any,
) {
  const footnotes = this.footnotes;
  const identifiers: any[] = footnotes.map((f) => f.identifier);

  let identifier = 1;
  while (identifiers.indexOf(`${identifier}`) !== -1) {
    identifier++;
  }

  footnotes.push({
    type: 'footnoteDefinition',
    identifier: `${identifier}`,
    children: node.children,
    position: node.position,
  });

  return {
    type: 'footnoteReference',
    identifier: `${identifier}`,
    position: node.position,
  };
}
