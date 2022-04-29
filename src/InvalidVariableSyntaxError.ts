export default class InvalidVariableSyntaxError extends Error {
  constructor(variableSyntax: string, index: number) {
    super(`Invalid variable syntax at index ${index}: '${variableSyntax}'`);
  }
}
