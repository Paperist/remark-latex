import { Converters } from '../converters';
export default class LaTeXCompiler {
    file: any;
    footnotes: any[];
    definitions: any;
    converters: Converters;
    options: any;
    constructor(file: any, options?: any);
    compile(node: any): string;
    visit(node: any, parent: any, idx?: number): string;
    convert(node: any): string;
    all(parent: any): string[];
    generateFootnotes(): string;
}
