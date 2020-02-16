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
    name: "sama",
    desc: "hi",
    parentId: 3
  });
  addCategory({
    name: "anal",
    desc: "hi",
    parentId: 2
  });
  addCategory({
    name: "anal2",
    desc: "hi",
    parentId: 2
  });
  addCategory({
    name: "anal2",
    desc: "hi",
    parentId: 2
  });

  //    console.log(arr);
  //    console.log("*******************************************************************");
//   deleteCategoryById(11);
//   deleteCategoryById(7);
  //deleteCategoryById([10,11,12,13,14]);
 deleteCategoryById([9,20,30,12,2]);


  // console.log(arr);
  //console.log("*******************************************************************8");
  // deleteCategoryById([20,7]);
  //   console.log(arr);
  // console.log("*******************************************************************8");
  // deleteCategoryById([8,9,10,11,12,13]);
  //    console.log(arr);
  //console.log("*******************************************************************8");
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
function deleteCategoryById(ids) {
    let ids_exist=[];
    var result;
  if (!Array.isArray(ids)) {
    arr = arr.filter(object => object.id !== ids);
  } else {
      for(let j =0 ;j<ids.length;j++)
      {
      result =arr.filter(object=>object.id===ids[j] )
     if (result.length!=0){
     ids_exist.push(result);
     }
    }
    console.log(ids_exist);

      if(ids.length==ids_exist.length)
       {
           for (let i=0;i<ids.length;i++)
          {
          arr = arr.filter(object => object.id !== ids[i]);
          }
       }
       else 
       { 
        for(let i=0; i< ids_exist.length;i++ ) 
        {
            console.log("this" +ids_exist[i].id+"is not exist"); 
        }          
       }
  }
}
console.log(arr);