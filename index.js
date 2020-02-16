const fs = require("fs");
var arrString = fs.readFileSync("./categories.json", "utf-8");
var arr = JSON.parse(arrString);
main();
function main() {

}
