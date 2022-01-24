const fs = require("fs");
const path = require("path");

function treeFn(dirPath){
    if (dirPath == undefined) {
      console.log("Please enter a valid Directory path");
      return;
    }
    else{
      let doesExist = fs.existsSync(dirPath)
      if (doesExist == true) {
        treeHelper(dirPath,' ');
    }
  }
  }
  
   function treeHelper(targetPath,indent){
   let isFile = fs.lstatSync(targetPath).isFile()
  
   if(isFile==true){
     let FileName = path.basename(targetPath)
     console.log(indent+ "├── "+FileName)
   }
   else{
        let dirName = path.basename(targetPath)
        console.log(indent + "└── "+dirName)
  
        let children = fs.readdirSync(targetPath)
  
        for(let i=0;i<children.length;i++){
          let childpath = path.join(targetPath,children[i])
          treeHelper(childpath,indent+'\t')
        }
   }
   }

   module.exports={
    treeFnKey : treeFn,
}