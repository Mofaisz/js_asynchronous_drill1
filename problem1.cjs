const fs = require("fs");
const path = require("path");
const files = 10;
const dir = path.resolve("./testsProblem1");


// fucntion to create a files 
function createsFiles(callback) {
  // creates a directory
  fs.mkdir(dir, { recursive: true }, (err) => {
    // error handling and calling a callback if error happens
    if (err) {
      return callback(err);
    }
    // if reaches to this level a directory get created
    console.log("Directory created succesfully");
    // initialized pendingFiles with files which have value of 10
    let pendingFiles = files;
    // loops to create files
    for (let index = 1; index < pendingFiles + 1; index++) {
      // we are converting a js object into json math.random() will taky anything
      let data = JSON.stringify({ id: 1, value: Math.random() });
      const filePath = path.join(dir, `file${index}.json`);
      // writes a file at the given path 
      fs.writeFile(filePath, data, (err) => {
        if (err) {
          return callback(err);
        }
        console.log(`Files-${pendingFiles} created succesfully`);
        // decrements the pending files by 1 since a file get created every time a loops iterates
        pendingFiles--;
        // if pendingFiles becomes 0 invoke callback to 0
        if (pendingFiles === 0) {
          callback(null);
        }
      });
    }
  });
}


// function to delete files 
function deleteFiles(callback) {
  // it read directory where all the files get created
  fs.readdir(dir, (err, files) => {
    if (err) {
      return callback(err);
    }
    // checks if files is in the folder or not
    if (files.length === 0) {
      console.log("No files found to be deleted might be all get deleted");
      return callback(null);
    }
    pendingFiles = files.length;
    // iterates over the files
    files.forEach((file) => {
      let fileToDelete = path.join(dir, file);
      // deletes the file 
      fs.unlink(fileToDelete, (err) => {
        if (err) {
          callback(err);
        }

        console.log(`file ${pendingFiles} deleted`);
        pendingFiles--;

        if (pendingFiles === 0) {
          console.log("All files deleted succefully");
          callback(null);
        }
      });
    });
  });
}
// console.log('Testing Problem 1');

module.exports = { createsFiles, deleteFiles };
