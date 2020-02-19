const { searchCategory } = require("./index.js");
describe("testing searchCategory", () => {
  const firstcategories = [
    { name: "sajeda khdair" },
    { name: "bab" },
    { name: "Ahmad KHDAIR" }
  ];
  const secondcategories = [
    { description: "My name is sajeda" },
    { description: "sajeda khdaiir" },
    { description: "MY NAME is Ahmad" }
  ];
  test("testing searchCategory ByName using function startsWith(case insensitive)", () => {
    const result = searchCategory(firstcategories, "name", "startsWith", "a");
    const expected = [{ name: "Ahmad KHDAIR" }];
    expect(result).toStrictEqual(expected);
  });
  test("testing searchCategory By Name using function endswith(case insensitive)", () => {
    const result = searchCategory(
      firstcategories,
      "name",
      "endsWith",
      "khdair"
    );
    const expected = [{ name: "sajeda khdair" }, { name: "Ahmad KHDAIR" }];
    expect(result).toStrictEqual(expected);
  });
  test("testing searchCategory By description using function includes(case insensitive)", () => {
    const result = searchCategory(
      secondcategories,
      "description",
      "includes",
      "My name"
    );
    const expected = [
      { description: "My name is sajeda" },
      { description: "MY NAME is Ahmad" }
    ];
    expect(result).toStrictEqual(expected);
  });
});
