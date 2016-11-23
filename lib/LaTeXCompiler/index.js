"use strict";
const visitors_1 = require('../visitors');
const visit = require('unist-util-visit');
class LaTeXCompiler {
    constructor(file, options) {
        this.file = file;
        this.options = options;
        this.footnotes = [];
        this.definitions = {};
        this.visitors = visitors_1.default;
        if (file.extension) {
            file.move({
                extension: 'tex',
            });
        }
        if (file.extname) {
            file.extname = '.tex';
        }
    }
    compile(node) {
        visit(node, 'definition', (def) => {
            const id = def.identifier.toUpperCase();
            this.definitions[id] = def;
        });
        visit(node, 'footnoteDefinition', (def) => {
            this.footnotes.push(def);
        });
        return this.visit(node, null) + '\n' + this.generateFootnotes();
    }
    visit(node, parent) {
        const type = (node) ? node.type : '';
        const fnName = (typeof this.visitors[type] === 'function') ? type : 'unknown';
        const fn = this.visitors[fnName];
        if (!type) {
            this.file.fail(`Expected node \`${node}\``);
        }
        return fn.call(this, node, parent);
    }
    all(parent) {
        const children = parent.children;
        const length = children.length;
        const values = [];
        let prev;
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
        const results = [];
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LaTeXCompiler;
