"use strict";
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const jsYAML = require('js-yaml');
const converters_1 = require('../converters');
const visit = require('unist-util-visit');
class LaTeXCompiler {
    constructor(file, options = {}) {
        this.file = file;
        this.options = options;
        this.footnotes = [];
        this.definitions = {};
        this.converters = converters_1.default;
        if (file.extension) {
            file.move({
                extension: 'tex',
            });
        }
        if (file.extname) {
            file.extname = '.tex';
        }
        this.options.templatesDir =
            this.options.templatesDir || path.resolve(__dirname, '../templates');
        this.options.imageConfigs = {
            keepaspectratio: true,
        };
    }
    compile(node) {
        visit(node, 'yaml', (yamlNode) => {
            try {
                const opts = jsYAML.safeLoad(yamlNode.value);
                this.options = Object.assign(this.options, opts.latex || {});
            }
            catch (_e) {
                this.file.fail(_e.message || _e, yamlNode);
            }
        });
        visit(node, 'definition', (def) => {
            const id = def.identifier.toUpperCase();
            this.definitions[id] = def;
        });
        visit(node, 'footnoteDefinition', (def) => {
            this.footnotes.push(def);
        });
        const compiled = this.visit(node, null) + '\n' + this.generateFootnotes();
        if (!this.options.baseTemplateFile) {
            return compiled;
        }
        try {
            const templatePath = path.resolve(this.file.dirname, this.options.baseTemplateFile);
            const template = fs.readFileSync(templatePath, 'utf8');
            const data = Object.assign({}, this.options.documentInfo || {}, { body: compiled });
            return ejs.render(template, data, { escape: (text) => text });
        }
        catch (_e) {
            this.file.fail(_e.message || _e, node);
            return compiled;
        }
    }
    visit(node, parent, idx = 0) {
        const type = (node) ? node.type : '';
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
    convert(node) {
        const type = (node) ? node.type : '';
        if (!type) {
            return '';
        }
        let template;
        try {
            const templatePath = path.resolve(this.options.templatesDir, `./${type}.ejs`);
            template = fs.readFileSync(templatePath, 'utf8');
        }
        catch (_e) {
            try {
                const templatePath = path.resolve(__dirname, '../templates', `./${type}.ejs`);
                template = fs.readFileSync(templatePath, 'utf8');
            }
            catch (_e) {
                this.file.fail(_e.message || _e, node);
                return '';
            }
        }
        const rendered = ejs.render(template, node, { escape: (text) => text });
        return rendered.replace(/\n$/, '');
    }
    all(parent) {
        const children = parent.children;
        const length = children.length;
        const values = [];
        let prev;
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
        const results = [];
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LaTeXCompiler;
