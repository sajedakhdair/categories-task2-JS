const fs = require("fs");
var categoriesString = fs.readFileSync("./categories.json", "utf-8");
var categories = JSON.parse(categoriesString);
main();
function main() {
  addController({
    name: "Salma",
    description: "hi,My name is Salma",
    parentId: 4
  });
  addController({
    name: "Salma",
    description: "hi,My name is Salma",
    parentId: 9
  });
  addController({
    name: "Doaa",
    description: "hi,My name is Doaa",
    parentId: undefined
  });
  let updateItem1 = updateCategory(categories, 11, { name: "Rajaa" });
  let updateItem2 = updateCategory(categories, 12, {
    name: "Doaa",
    description: "My name is Doaa"
  });
  let resultOfSearchName = searchCategory(
    categories,
    "name",
    "startsWith",
    "c"
  );
  console.log(resultOfSearchName);
  let resultOfSearchDesc = searchCategory(
    categories,
    "description",
    "includes",
    "My name"
  );
  console.log(resultOfSearchDesc);
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
  if (nameOfCategories == false) {
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
function updateCategory(categories, id, newDataForItem) {
  if (newDataForItem.parentId === undefined) {
    newDataForItem.parentId = null;
    var flagUndfined = true;
  }
  //this flag to ensure that validate_parentId not fail here if there is no update in parentid
  //if doesn't enter new value for parentId
  const isValid = validateItem(newDataForItem);
  if (flagUndfined === true) newDataForItem.parentId = undefined;
  if (isValid === true) {
    let ItemAfterUpdate = {};
    const ItemBeforeUpdate = categories.find(object => object.id === id);
    const index = categories.findIndex(object => object.id === id);
    if (newDataForItem.name !== undefined)
      ItemAfterUpdate.name = newDataForItem.name;
    else ItemAfterUpdate.name = ItemBeforeUpdate.name;
    if (newDataForItem.description !== undefined)
      ItemAfterUpdate.description = newDataForItem.description;
    else ItemAfterUpdate.description = ItemBeforeUpdate.description;
    if (newDataForItem.parentId !== undefined)
      ItemAfterUpdate.parentId = newDataForItem.parentId;
    else ItemAfterUpdate.parentId = ItemBeforeUpdate.parentId;
    ItemAfterUpdate = { id, ...ItemAfterUpdate };
    categories[index] = ItemAfterUpdate;
    return ItemAfterUpdate;
  } else return isValid;
}
function searchCategory(categories, field, compareLogic, searchText) {
  let lowerCasesearchText = searchText.toLowerCase();
  if (compareLogic === "startsWith") {
    var resultOfSearch = categories.filter(object =>
      object[field].toLowerCase().startsWith(lowerCasesearchText)
    );
  } else if (compareLogic === "endsWith") {
    var resultOfSearch = categories.filter(object =>
      object[field].toLowerCase().endsWith(lowerCasesearchText)
    );
  } else if (compareLogic === "includes") {
    var resultOfSearch = categories.filter(object =>
      object[field].toLowerCase().includes(lowerCasesearchText)
    );
  }
  return resultOfSearch;
}
function writeCatOnFile() {
  fs.writeFileSync("./categories.json", JSON.stringify(categories), "utf-8");
}
module.exports = {
  searchCategory
};
