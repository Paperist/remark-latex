import LaTeXCompiler from '../../LaTeXCompiler';

export default function reference(
  this: LaTeXCompiler,
  node: any,
) {
  const identifier = node.identifier.toUpperCase();
  const def = this.definitions[identifier] || {};

  const bind = Object.assign({
    url: def.url,
    alt: def.title,
  }, node);

  bind.type = bind.type.replace('Reference', '');
  bind.value = this.all(bind).join('');

  return bind;
}
