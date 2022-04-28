import { resolve } from ".";

const result = resolve(
  "My name is ${name} and I'm ${age}. \\${escaped}. Name again: ${name}.",
  { name: "Fernando", age: 38 }
);
console.log(result);
