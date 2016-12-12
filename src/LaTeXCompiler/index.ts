import * as path from 'path';
import * as fs from 'fs';
import * as ejs from 'ejs';
import * as jsYAML from 'js-yaml';
import * as _ from 'lodash';
import converters, { Converters } from '../converters';
import visit = require('unist-util-visit');

export default class LaTeXCompiler {

  public footnotes: any[] = [];
  public definitions: any = {};
  public converters: Converters = converters;
  public options: any;

  constructor(
    public file: any,
    options: any = {},
  ) {
    if (file.extension) {
      file.move({
        extension: 'tex',
      });
    }
    if (file.extname) {
      file.extname = '.tex';
    }

    this.options = _.cloneDeep(options);
    this.options.templatesDir =
      this.options.templatesDir || path.resolve(__dirname, '../templates');
    this.options.imageConfigs = Object.assign(
      this.options.imageConfigs || {},
      {
        keepaspectratio: true,
      });
  }

  compile(
    node: any,
  ) {
    visit(node, 'yaml', (yamlNode: any) => {
      try {
        const opts = jsYAML.safeLoad(yamlNode.value);
        this.options = Object.assign(this.options, opts.latex || {});
      } catch (_e) {
        this.file.fail(_e.message || _e, yamlNode);
      }
    });

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
      const templatePath = path.resolve(this.file.dirname, this.options.baseTemplateFile);
      const template = fs.readFileSync(templatePath, 'utf8');
      const data =
        Object.assign({}, this.options.documentInfo || {}, { body: compiled });
      return ejs.render(template, data, <any> { escape: (text: string) => text });
    } catch (_e) {
      this.file.fail(_e.message || _e, node);
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
      const templatePath = path.resolve(this.options.templatesDir, `./${type}.ejs`);
      template = fs.readFileSync(templatePath, 'utf8');
    } catch (_e) {
      try {
        const templatePath = path.resolve(__dirname, '../templates', `./${type}.ejs`);
        template = fs.readFileSync(templatePath, 'utf8');
      } catch (_e) {
        this.file.fail(_e.message || _e, node);
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
