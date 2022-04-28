import InvalidVariableNameError from "./InvalidVariableNameError";
import { resolve } from "./resolve";
import UnassignedVariableError from "./UnassignedVariableError";

describe("resolve", () => {
  it("should return the same string when the template has no variable", () => {
    const template = "No variable here.";
    expect(resolve(template, {})).toEqual(template);
  });
  it("should replace variable properly", () => {
    const template = "before ${update} after";
    const variables = {
      update: "sample value",
    };
    expect(resolve(template, variables)).toEqual("before sample value after");
  });
  it("should replace multible variables properly", () => {
    const template = "1: ${var1}, 2: ${var2}, 3: ${var3}.";
    const variables = {
      var1: "first",
      var2: "second",
      var3: "third",
    };
    expect(resolve(template, variables)).toEqual(
      "1: first, 2: second, 3: third."
    );
  });
  it("should allow to use the same variable multiple times", () => {
    const template = "I want a ${thing}... I need a ${thing}!";
    const variables = {
      thing: "chocolate bar",
    };
    expect(resolve(template, variables)).toEqual(
      "I want a chocolate bar... I need a chocolate bar!"
    );
  });
  it("should throw UnassignedVariableError when variable in the template was not assigned any value", () => {
    const template = "What is ${this}?";
    const variables = {};
    expect(() => resolve(template, variables)).toThrow(UnassignedVariableError);
  });
  it("should dismiss variable name with white space", () => {
    const template = "This will be kept as is: ${as is}.";
    const variables = {};
    expect(resolve(template, variables)).toEqual(template);
  });
  it.each(["$", "{"])(
    "should dismiss variable name with unallowed characters (%s)",
    (unallowedChar) => {
      const variableName = "a" + unallowedChar + "b";
      const template = "This will be kept as is: ${" + variableName + "}.";
      const variables = {};
      expect(resolve(template, variables)).toEqual(template);
    }
  );
  it("should dismiss empty variable name", () => {
    const template = "This will be kept as is: ${}.";
    const variables = {};
    expect(resolve(template, variables)).toEqual(template);
  });
  it.each(["1name", "$name", ""])(
    "should thorow an error when the variables map contains an invalid variable name (%s)",
    (variableName) => {
      const template = "Template";
      const variables = {
        [variableName]: "value",
      };
      expect(() => resolve(template, variables)).toThrow(
        InvalidVariableNameError
      );
    }
  );
});
