import LaTeXCompiler, { LaTeXCompilerOptions } from './LaTeXCompiler';
import { defaultsDeep } from 'lodash';

import searchFile from './searchFile';

export default function attacher(this: any, options: LaTeXCompilerOptions) {
  const mergedOpts: LaTeXCompilerOptions = defaultsDeep(
    options,
    (this.data('settings') || { latex: {} }).latex
  );

  mergedOpts.baseTemplate = searchFile(mergedOpts.baseTemplate);
  mergedOpts.templatesDir = searchFile(mergedOpts.templatesDir);

  LaTeXCompiler.defaultOptions = defaultsDeep(
    mergedOpts,
    LaTeXCompiler.defaultOptions
  );

  LaTeXCompiler.processor = this;
  this.Compiler = LaTeXCompiler;
}
Object.assign(attacher, { Compiler: LaTeXCompiler });
