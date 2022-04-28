import UnassignedVariableError from "./UnassignedVariableError";

const variablePattern = /\$\{([^${} ]+)\}/g;

/**
 * Takes a `template` text including variables, and replaces the variables with the values definid
 * in the `variables` map.
 * 
 * Variables within the template should follow syntax like: ${foo}.
 * 
 * @param template The template text where variables can be used to get replaced.
 * @param variables A map from variables names to the values to be replaced.
 * @returns The result from replacing template text with variable values from the map.
 */
export const resolve = (template: string, variables: Record<string, any>) => {
  const matchIterator = template.matchAll(variablePattern);
  let matchResult = matchIterator.next();
  let result = "";
  let previousIndex = 0;
  while (!matchResult.done) {
    const matchContents = matchResult.value as RegExpMatchArray;
    const variableName = matchContents[1];
    const matchIndex = matchContents.index ?? 0;
    if (!variables.hasOwnProperty(variableName)) {
      throw new UnassignedVariableError(variableName, matchIndex);
    }
    result += template.substring(previousIndex, matchIndex);
    result += variables[variableName];
    const templateVariable = matchContents[0];
    previousIndex = matchIndex + templateVariable.length;
    matchResult = matchIterator.next();
  }

  // remaining part of the template
  result += template.substring(previousIndex);

  return result;
};

