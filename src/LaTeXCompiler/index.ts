import * as path from 'path';
import * as fs from 'fs';
import * as ejs from 'ejs';
import * as jsYAML from 'js-yaml';
import { defaultsDeep } from 'lodash';
import converters, { Converters } from '../converters';
import visit = require('unist-util-visit');

import searchFile from '../searchFile';

import { UNIST } from 'unist';
import { MDAST } from 'mdast';

export interface LaTeXCompilerOptions {
  documentInfo: { [key: string]: any };
  baseTemplate: string | null;
  templatesDir: string | null;
  imageConfigs: { [key: string]: any };
}

export interface ConvertOptionsNode {
  index: number;
  isFirst: boolean;
  isLast: boolean;
}

export default class LaTeXCompiler {
  static defaultOptions: LaTeXCompilerOptions = {
    documentInfo: {},
    baseTemplate: null,
    templatesDir: path.resolve(__dirname, '../templates'),
    imageConfigs: {
      keepaspectratio: true,
    },
  };
  static processor: any;

  public footnotes: MDAST.FootnoteDefinition[] = [];
  public definitions: { [identifier: string]: MDAST.Definition } = {};
  public converters: Converters = converters;
  public options: LaTeXCompilerOptions = LaTeXCompiler.defaultOptions;

  private templates: { [type: string]: ejs.TemplateFunction } = {};

  constructor(public tree: UNIST.Node, public file: any) {
    if (file.extension) {
      file.move({
        extension: 'tex',
      });
    }
    if (file.extname) {
      file.extname = '.tex';
    }
  }

  parse(value: string) {
    const ast = LaTeXCompiler.processor.parse(value);
    return LaTeXCompiler.processor.runSync(ast);
  }

  private readTemplate(type: string) {
    if (type in this.templates) {
      return this.templates[type];
    }

    let templateStr;
    try {
      const templatePath = path.resolve(
        this.options.templatesDir,
        `./${type}.ejs`
      );
      templateStr = fs.readFileSync(templatePath, 'utf8');
    } catch (_err) {}

    if (!templateStr) {
      try {
        const templatePath = path.resolve(
          path.resolve(__dirname, '../templates'),
          `./${type}.ejs`
        );
        templateStr = fs.readFileSync(templatePath, 'utf8');
      } catch (err) {
        throw err;
      }
    }

    this.templates[type] = ejs.compile(
      templateStr,
      { context: this, escape: (text: string) => text } as any
    );

    return this.templates[type];
  }

  compile() {
    const node = this.tree;

    visit(node, 'yaml', (YAMLNode: MDAST.YAML) => {
      try {
        const opts = jsYAML.safeLoad(YAMLNode.value) || {};
        opts.baseTemplate = searchFile(opts.baseTemplate, this.file.dirname);
        opts.templatesDir = searchFile(opts.templatesDir, this.file.dirname);
        this.options = defaultsDeep(opts, this.options);
        return true;
      } catch (_e) {
        this.file.fail(_e.message || _e, YAMLNode);
        return false;
      }
    });

    visit(node, 'definition', (def: MDAST.Definition) => {
      const id = def.identifier.toUpperCase();
      this.definitions[id] = def;
      return true;
    });
    visit(node, 'footnoteDefinition', (def: MDAST.FootnoteDefinition) => {
      this.footnotes.push(def);
      return true;
    });

    const compiled = (this.visit(node) +
      '\n' +
      this.generateFootnotes()).trim();

    if (!this.options.baseTemplate) {
      return compiled;
    }

    try {
      const templatePath = path.resolve(this.options.baseTemplate);
      const template = fs.readFileSync(templatePath, 'utf8');
      const data = defaultsDeep(
        {
          body: compiled,
        },
        this.options.documentInfo
      );
      return ejs.render(
        template,
        data,
        { context: this, escape: (text: string) => text } as any
      );
    } catch (_e) {
      this.file.fail(_e.message || _e, node);
      return compiled;
    }
  }

  visit(node: any, parent?: UNIST.Parent, idx: number = 0) {
    const type: string = node ? node.type : '';
    if (!type) {
      this.file.fail(`Expected node \`${node}\``);
    }

    let cloneNode = defaultsDeep(
      {
        index: idx,
        isFirst: parent ? idx === 0 : true,
        isLast: parent ? idx === parent.children.length - 1 : true,
      },
      node
    ) as UNIST.Node & ConvertOptionsNode;

    if (typeof this.converters[type] === 'function') {
      cloneNode = this.converters[type].call(this, cloneNode, parent);
    }

    return this.convert(cloneNode);
  }

  convert(node: UNIST.Node) {
    const type: string = node ? node.type : '';
    if (!type) {
      return '';
    }

    let template: ejs.TemplateFunction;
    try {
      template = this.readTemplate(type);
    } catch (_e) {
      this.file.fail(_e.message || _e, node);
      return '';
    }

    return template(node).replace(/\n$/, '');
  }

  all(parent: UNIST.Parent) {
    const children = parent.children;
    const length = children.length;
    const values: string[] = [];

    for (let idx = 0; idx < length; idx++) {
      let value = this.visit(children[idx], parent, idx) || '';
      if (children[idx - 1] && children[idx - 1].type === 'break') {
        value = value.replace(/^\s*/g, '');
      }
      values.push(value);
    }

    return values;
  }

  generateFootnotes() {
    const definitions = this.footnotes;
    const results: string[] = [];

    definitions.forEach((def, idx) => {
      const node = defaultsDeep(
        {
          identifier: `${idx + 1}`,
          value: this.all(def).join(''),
        },
        def
      ) as UNIST.Node;
      results.push(this.convert(node));
    });

    return results.join('\n');
  }
}

/**
 * Monkey patch
 * See https://github.com/unifiedjs/unified/blob/6.1.5/index.js#L410-L421
 */
Object.assign(LaTeXCompiler.prototype, {
  __monkeypatch: {},
});
