import LaTeXCompiler from '../../LaTeXCompiler';

export default function linkReference(
  this: LaTeXCompiler,
  node: any,
) {
  const identifier = node.identifier.toUpperCase();
  const def = this.definitions[identifier] || {};

  const bind = Object.assign({
    href: def.link,
    alt: def.title,
  }, node);

  return this.visitors.link.call(this, bind);
}
