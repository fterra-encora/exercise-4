import InvalidVariableSyntaxError from "./InvalidVariableSyntaxError";
import UnassignedVariableError from "./UnassignedVariableError";

const variablePattern = /(\\)?(\$\{([^ ]*)\})/g;

const validateVariableName = (variableName: string) =>
  variableName.match(/^[a-zA-Z]\w*$/);

/**
 * Takes a `template` text including variables, and replaces the variables with the values defined
 * in the `variables` map.
 *
 * Variables within the template should follow syntax like: ${foo}.
 *
 * @param template The template text where variables can be used to get replaced.
 * @param variables A map of variable names as keys with the values to be replaced.
 * @returns The result from replacing template text with variable values from the map.
 */
export const resolve = (template: string, variables: Record<string, any>) => {
  const matchIterator = template.matchAll(variablePattern);
  let matchResult = matchIterator.next();
  let result = "";
  let previousIndex = 0;
  while (!matchResult.done) {
    const matchContents = matchResult.value as RegExpMatchArray;
    const matchIndex = matchContents.index ?? 0;
    result += template.substring(previousIndex, matchIndex);
    const fullMatchedString = matchContents[0];
    const escapeCharacter = matchContents[1];
    const variableSyntax = matchContents[2];
    const variableName = matchContents[3];
    if (!escapeCharacter) {
      if (!validateVariableName(variableName)) {
        throw new InvalidVariableSyntaxError(variableSyntax, matchIndex);
      }
      if (!variables.hasOwnProperty(variableName)) {
        throw new UnassignedVariableError(variableName, matchIndex);
      }
    }
    const replacement = escapeCharacter ? variableSyntax : variables[variableName];
    result += replacement;
    previousIndex = matchIndex + fullMatchedString.length;
    matchResult = matchIterator.next();
  }

  // remaining part of the template
  result += template.substring(previousIndex);

  return result;
};
