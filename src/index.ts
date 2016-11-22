import LaTeXCompiler from './LaTeXCompiler';

export default function attacher(remark: any) {
  remark.Compiler = LaTeXCompiler;
}

Object.assign(attacher, { Compiler: LaTeXCompiler });
