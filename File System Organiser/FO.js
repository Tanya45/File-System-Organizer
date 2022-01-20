const fs= require('fs')
const path= require('path')

let input = process.argv.slice(2);

let inputArr = input;
let command = inputArr[0];

switch (command) {
  case "tree":
    console.log("tree implemented");
    break;
  case "organize":
    organizeFn(inputArr[1])
    break;
  case "help":
    helpFn()
    break;
  default:
    console.log("Please enter a valid command")
    break;
}

//Help function will list all the ways by which you can run the commands of this project
function helpFn(){
    console.log(`List of all the commands->
                            1)Tree - node FO.js tree <dirPath>
                            2)Organize - node FO.js organize <dirPath>
                            3)Help - node FO.js help`)
}

//Organize function will organize all your target folder'files in different folders according to their extensions
function organizeFn(dirPath){
    let destPath
    if(dirPath==undefined){
        console.log('Please enter a valid Directory path')
        return;
    } //check whether the directory path is valid or not,if not simply return it. 

    let doesExist =fs.existsSync(dirPath) 

    //this doesExist will tell if the directory folder exists or not
    if(doesExist==true){
        destPath = path.join(dirPath,'organized_files') //we created a path for organized-file's folder
        //check whether in the given destination path, a folder exists with the same name or not,if not make a folder
        if(fs.existsSync(destPath)==false){ 
        fs.mkdirSync(destPath) 
        }
    else{
        console.log('Folder already exists')
    }
}
    else{
        console.log('Please Enter A valid Path')
    }    
}

//File System Organiser\testFolder\organized_files- we are ready to create new folder here