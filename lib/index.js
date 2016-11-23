"use strict";
const LaTeXCompiler_1 = require('./LaTeXCompiler');
function attacher(remark) {
    remark.Compiler = LaTeXCompiler_1.default;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = attacher;
Object.assign(attacher, { Compiler: LaTeXCompiler_1.default });
