import * as path from 'path';
import * as fs from 'fs';
import * as ejs from 'ejs';
import converters, { Converters } from '../converters';
import visit = require('unist-util-visit');

export default class LaTeXCompiler {

  public footnotes: any[] = [];
  public definitions: any = {};
  public converters: Converters = converters;

  constructor(
    public file: any,
    public options: any = {},
  ) {
    if (file.extension) {
      file.move({
        extension: 'tex',
      });
    }
    if (file.extname) {
      file.extname = '.tex';
    }

    this.options.templatesDir =
      this.options.templatesDir || path.join(__dirname, '../templates');
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

    const compiled = this.visit(node, null) + '\n' + this.generateFootnotes();
    if (!this.options.baseTemplateFile) {
      return compiled;
    }

    try {
      const template = fs.readFileSync(this.options.baseTemplateFile, 'utf8');
      const data =
        Object.assign({}, this.options.documentInfo || {}, { body: compiled });
      return ejs.render(template, data, <any> { escape: (text: string) => text });
    } catch (_e) {
      console.error(_e.message || _e);
      return compiled;
    }
  }

  visit(
    node: any,
    parent: any,
    idx: number = 0,
  ) {
    const type: string = (node) ? node.type : '';
    if (!type) {
      this.file.fail(`Expected node \`${node}\``);
    }

    let cloneNode = Object.assign({}, node, {
      index: idx,
      isFirst: (idx === 0),
      isLast: (parent) ? (idx === parent.children.length - 1) : true,
    });

    if (typeof this.converters[type] === 'function') {
      cloneNode = this.converters[type].call(this, cloneNode, parent);
    }

    return this.convert(cloneNode);
  }

  convert(
    node: any,
  ) {
    const type: string = (node) ? node.type : '';
    if (!type) {
      return '';
    }

    let template: string;
    try {
      const templatePath = path.join(this.options.templatesDir, `./${type}.ejs`);
      template = fs.readFileSync(templatePath, 'utf8');
    } catch (_e) {
      try {
        const templatePath = path.join(__dirname, '../templates', `./${type}.ejs`);
        template = fs.readFileSync(templatePath, 'utf8');
      } catch (_e) {
        console.error(_e.message || _e);
        return '';
      }
    }

    const rendered = ejs.render(template, node, <any> { escape: (text: string) => text });
    return rendered.replace(/\n$/, '');
  }

  all(
    parent: any,
  ) {
    const children = parent.children;
    const length = children.length;
    const values: string[] = [];
    let prev: any;

    for (let idx = 0; idx < length; idx++) {
      let value = this.visit(children[idx], parent, idx) || '';

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
      def.identifier = idx + 1;
      def.value = this.all(def).join('');
      results.push(this.convert(def));
    }

    return results.join('\n');
  }
}
