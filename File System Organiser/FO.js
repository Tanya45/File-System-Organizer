const fs = require("fs");
const path = require("path");

let input = process.argv.slice(2);

let inputArr = input;
let command = inputArr[0];
let types = {
  media: ["mp4", "mkv", "mp3"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
    "pptx"
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};

switch (command) {
  case "tree":
    treeFn(inputArr[1]);
    break;
  case "organize":
    organizeFn(inputArr[1]);
    break;
  case "help":
    helpFn();
    break;
  default:
    console.log("Please enter a valid command");
    break;
}

//Help function will list all the ways by which you can run the commands of this project
function helpFn() {
  console.log(`List of all the commands->
                            1)Tree - node FO.js tree <dirPath>
                            2)Organize - node FO.js organize <dirPath>
                            3)Help - node FO.js help`);
}

//Organize function will organize all your target folder'files in different folders according to their extensions
function organizeFn(dirPath) {
  let destPath;
  if (dirPath == undefined) {
    console.log("Please enter a valid Directory path");
    return;
  } //check whether the directory path is valid or not,if not simply return it.

  let doesExist = fs.existsSync(dirPath);

  //this doesExist will tell if the directory folder exists or not
  if (doesExist == true) {
    destPath = path.join(dirPath, "organized_files"); //we created a path for organized-file's folder
    //check whether in the given destination path, a folder exists with the same name or not,if not make a folder
    if (fs.existsSync(destPath) == false) {
      fs.mkdirSync(destPath);
    } else {
      console.log("Folder already exists");
    }
  } else {
    console.log("Please Enter A valid Path");
  }
  organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest) {
  let childnames = fs.readdirSync(src);
  //console.log(childnames)
  for (i = 0; i < childnames.length; i++) {
    let childAddress = path.join(src, childnames[i]);
    //console.log(childAddress)
    let isFile = fs.lstatSync(childAddress).isFile();
    if (isFile == true) {
      let filecategory = getCategory(childnames[i])
      //console.log(childnames[i]+"  " + filecategory)
      sendFiles(childAddress,dest,filecategory)
    }
  }
}
//File System Organiser\testFolder\organized_files- we are ready to create new folder here
function getCategory(FileName){
  // here we extracted the extension name of the target files 
    let ext =path.extname(FileName).slice(1)
    
      //we took out all the category types arrays here
      for (let key in types){
        let cTypedArray= types[key]
          //console.log(cTypedArray)
        for(let i=0; i< cTypedArray.length; i++){
          if(ext== cTypedArray[i]){
            return key;
          }
      }
    }  
    return 'others'
    
}

function sendFiles(srcFilePath,dest,filecategory){

  //creating path for each category type encountered to create folders of their names             
   let catPath = path.join(dest,filecategory)

   //D://File System Organiser\testFolder\organized_files\app
   //D://File System Organiser\testFolder\organized_files\archives
   //D://File System Organiser\testFolder\organized_files\documents
   //D://File System Organiser\testFolder\organized_files\others

   if(fs.existsSync(catPath)==false){
     fs.mkdirSync(catPath)
   }

   let FileName = path.basename(srcFilePath)
   // we took out the base names of the files
   
   let destFilePath = path.join(catPath,FileName)

   fs.copyFileSync(srcFilePath,destFilePath)
   fs.unlinkSync(srcFilePath)

   console.log('Files Organized')
}

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