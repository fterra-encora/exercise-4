export default class UnassignedVariableError extends Error {
  constructor(variableName: string, index: number) {
    super(
      `Template variable '${variableName}' referenced at index ${index} was not assigned any value!`
    );
  }
}
