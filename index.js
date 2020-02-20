const categoriesFilePath = "./categories.json";
const fs = require("fs");
function readFromJsonFile(filePath) {
  var categoriesString = fs.readFileSync(filePath, "utf-8");
  return categoriesString;
}
var categories;
main();
function main() {
  categories = JSON.parse(readFromJsonFile(categoriesFilePath));
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
  let updateItem1 = updateCategory(categories, 11, { name: "Rajaaa" });
  let updateItem2 = updateCategory(categories, 12, {
    name: "Doaaa",
    description: "My name is Doaa Khdair"
  });
  let productsWithSameCatId = getProducts(10);
  console.log(productsWithSameCatId);
  writeCatOnFile(categoriesFilePath, categories);
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
  if (nameOfCategories == false) {
    return true;
  } else return { name: "name is not unique" };
}
function validateParentId(pid) {
  if (pid === null) return true;
  if (typeof pid === " number") {
    return true;
  }
  return { parentId: "does not exist" };
}
function addItem(item) {
  let id = categories[categories.length - 1].id + 1;
  categories.push({ id, ...item });
}
function updateCategory(categories, id, newDataForItem) {
  if (newDataForItem.parentId === undefined) {
    newDataForItem.parentId = null;
    var flagUndfined = true;
  }
  //this flag to ensure that validate_parentId not fail here if there is no update in parentid
  //if doesn't enter new value for parentId
  const ItemBeforeUpdate = categories.find(object => object.id === id);
  const isValid = validateItem(newDataForItem);
  if (flagUndfined === true) newDataForItem.parentId = undefined;
  if (isValid !== true) {
    return isValid;
  }
  const index = categories.findIndex(object => object.id === id);
  categories[index] = { ...ItemBeforeUpdate, ...newDataForItem };
}
function writeCatOnFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");
}
function getProducts(catId) {
  const productsFilePath = "./products.json";
  let productsArray = readWithRequire(productsFilePath);
  const productsWithSameCatId = productsArray.filter(
    object => object.categoryId === catId
  );
  return productsWithSameCatId;
}
function readWithRequire(filePath) {
  const productsArray = require(filePath);
  return productsArray;
}
