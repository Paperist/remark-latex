import LaTeXCompiler from '../LaTeXCompiler';
export interface Converters {
    [key: string]: (...args: any[]) => any;
}
export { LaTeXCompiler };
declare var _default: Converters;
export default _default;
