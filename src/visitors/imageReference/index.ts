import LaTeXCompiler from '../../LaTeXCompiler';

export default function linkReference(
  this: LaTeXCompiler,
  node: any,
) {
  const identifier = node.identifier.toUpperCase();
  const def = this.definitions[identifier] || {};

  const bind = Object.assign({
    url: def.url,
    alt: def.title,
  }, node);

  return this.visitors.image.call(this, bind);
}
