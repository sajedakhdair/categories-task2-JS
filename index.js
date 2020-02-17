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
  writeCat();
}

function addCategory(item) {
  let id = validateItem(item);
  if (id) {
    newitem = { id, ...item };
    arr.push(newitem);
    arr;
    console.log(arr);
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
function writeCat()
{
fs.writeFileSync("./categories.json", JSON.stringify(arr),"utf-8");
}