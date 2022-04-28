# exercise-4
A simple template engine function.

## Usage
```
const resolve: (template: string, variables: Record<string, any>) => string
```

### `template`
The first parameter is the template text.

You can use variables on the template by using syntax like: `${foo}`.

### `variables`
The second parameter is the variables map, where the key will be looked for when resolving the template, and the variable will be replaced with the respective value.

### Return
The result from replacing the template text with variable values from the map.

## Example
```
import { resolve } from ".";

const result = resolve(
  "My name is ${name} and I'm ${age}.",
  { name: "Fernando", age: 38 }
);
console.log(result); // Outputs: My name is Fernando and I'm 38.

```

### Notes
If a variable appears in the template text but is not defined in the variables map, it throws an error.

Variable syntax can be escaped by using a `\` (backslach) before it.