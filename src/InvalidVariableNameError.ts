export default class InvalidVariableNameError extends Error {
  constructor(variableName: string) {
    let description = ""
    if (variableName === "") {
      description = "(empty string)";
    }
    let formattedVariable = `'${variableName}'`;
    if (description) {
      formattedVariable += ` ${description}`
    }
    super(`${formattedVariable} is not a valid variable name!`);
  }
}
