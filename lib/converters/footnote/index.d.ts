import LaTeXCompiler from '../../LaTeXCompiler';
export default function footnote(this: LaTeXCompiler, node: any): {
    type: string;
    identifier: string;
    position: any;
};
