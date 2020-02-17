const fs = require("fs");
var arrString = fs.readFileSync("./categories.json", "utf-8");
var arr = JSON.parse(arrString);
main();
function main() {
  addCategory({
    name: "sajeda",
    desc: "hi",
    parentId: 3
  });
  addCategory({
    name: "sajeda",
    desc: "hi",
    parentId: 3
  });
  getProducts(10);
}

function addCategory(item) {
  let id = validateItem(item);
  if (id) {
    newitem = { id, ...item };
    arr.push(newitem);
    arr;
  }
}
function validateItem(item) {
  let myname = item.name;
  let pid = item.parentId;
  const values = Object.values(arr[arr.length - 1]);
  const id = values[0] + 1;
  const arrayofname = arr.filter(object => object.name === myname);
  if (arrayofname.length == 0) {
    //////////////////
    if (pid == null || typeof pid === "number") return id;
  } else return false;
}
arr;
function getProducts(catId) {
  var arrProductString = fs.readFileSync("./products.json", "utf-8");
  var arrProduct = JSON.parse(arrProductString);
  const products = arrProduct.filter(object => object.categoryId === catId);
}