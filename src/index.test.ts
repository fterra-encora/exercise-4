import resolve from ".";

describe("resolve", () => {
  it("should return the same string when the template has no variable", () => {
    const template = "No variable here.";
    expect(resolve(template, {})).toEqual(template);
  });
});
