const fs = require("fs");
var categoriesString = fs.readFileSync("./categories.json", "utf-8");
var categories = JSON.parse(categoriesString);
main();
function main() {
  addController({
    name: "Salma",
    desc: "hi,My name is Salma",
    parentId: 4
  });
  addController({
    name: "Salma",
    desc: "hi,My name is Salma",
    parentId: 9
  });
  addController({
    name: "Doaa",
    desc: "hi,My name is Doaa",
    parentId: undefined
  });
  writeCatOnFile();
}
function addController(item) {
  const isValid = validateItem(item);
  if (isValid === true) {
    return addItem(item);
  }
}
function validateItem(item) {
  let valid_name = validateName(item.name);
  let valide_parentId = validateParentId(item.parentId);
  let errors = [];
  if (valid_name === true && valide_parentId === true) {
    return true;
  }
  if (valid_name !== true) {
    errors.push(valid_name);
  }
  if (valide_parentId !== true) errors.push(valide_parentId);
  return errors;
}
function validateName(myname) {
  const nameOfCategories = categories.some(object => object.name === myname);
  if (nameOfCategories== false) {
    return true;
  } else return { name: "name is not unique" };
}
function validateParentId(pid) {
  if (pid === null || typeof pid === "number") return true;
  else return { parentId: "does not exist" };
}
function addItem(item) {
  let id = categories[categories.length - 1].id + 1;
  categories.push({ id, ...item });
}
categories;
function writeCatOnFile() {
  fs.writeFileSync("./categories.json", JSON.stringify(categories), "utf-8");
}