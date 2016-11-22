import LaTeXCompiler from '../../LaTeXCompiler';

export default function listItem(
  this: LaTeXCompiler,
  node: any,
  parent: any,
) {
  const isSingle =
    !parent.loose &&
    node.children.length === 1 &&
    node.children[0].children;

  const item =
    this.all((isSingle) ? node.children[0] : node)
      .join((isSingle) ? '' : '\n');

  const result = `\\item\x20${item}\n`;
  return result;
}
