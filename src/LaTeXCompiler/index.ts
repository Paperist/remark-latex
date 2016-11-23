import visitors from '../visitors';
import visit = require('unist-util-visit');

export default class LaTeXCompiler {

  public footnotes: any[] = [];
  public definitions: any = {};
  public visitors = visitors;

  constructor(
    public file: any,
    public options: any,
  ) {
    if (file.extension) {
      file.move({
        extension: 'tex',
      });
    }
    if (file.extname) {
      file.extname = '.tex';
    }
  }

  compile(
    node: any,
  ) {
    visit(node, 'definition', (def: any) => {
      const id = def.identifier.toUpperCase();
      this.definitions[id] = def;
    });
    visit(node, 'footnoteDefinition', (def: any) => {
      this.footnotes.push(def);
    });

    return this.visit(node, null) + '\n' + this.generateFootnotes();
  }

  visit(
    node: any,
    parent: any,
  ) {
    const type: string = (node) ? node.type : '';
    const fnName =
      (typeof (<any> this.visitors)[type] === 'function') ? type : 'unknown';

    const fn: (...args: any[]) => string = (<any> this.visitors)[fnName];

    if (!type) {
      this.file.fail(`Expected node \`${node}\``);
    }
    return <string> fn.call(this, node, parent);
  }

  all(
    parent: any,
  ) {
    const children = parent.children;
    const length = children.length;
    const values: string[] = [];
    let prev: any;

    for (let idx = 0; idx < length; idx++) {
      let value = this.visit(children[idx], parent) || '';

      if (prev && prev.type === 'break') {
        value = value.replace(/^\s*/g, '');
      }
      values.push(value);

      prev = children[idx];
    }

    return values;
  }


  generateFootnotes() {
    const definitions = this.footnotes;
    const length = definitions.length;
    const results: string[] = [];

    if (!length) {
      return '';
    }

    for (let idx = 0; idx < length; idx++) {
      const def = definitions[idx];
      const identifier = def.identifier;
      const content = this.all(def).join('');

      results.push(`\\footnotetext[${identifier}]{${content}}`);
    }

    return results.join('\n');
  }
}
