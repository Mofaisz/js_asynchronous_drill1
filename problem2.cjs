// Importing a file system modules
const fs = require("fs");
// Define the paths for the input and output files
const path = require("path");
const dir = path.join(__dirname, "./lipsum.txt");
const fileName = path.join(__dirname, "./filenames.txt");

// Function to read file asynchronously
function readFile(callback) {
  fs.readFile(dir, "utf-8", (err, data) => {
    // if error, it will call callback function and it will handle error
    if (err) {
      return callback(err);
    }
    console.log("First step got completed -Reading a file ....");
    callback(null, data);
  });
}

// function for convert to uppercase and write a new file
function uppercaseAndWriteFile(data, callback) {
  console.log("Writing a file in uppercase to filnames.txt");
  let upperCaseContent = data.toUpperCase();
  // console.log(upperCaseContent);

  let filepath = path.join(__dirname, "uppercase.txt");
  // function to write file asynchronously
  fs.writeFile(filepath, upperCaseContent, (err) => {
    if (err) {
      return callback(err);
    }
    console.log("Written a file in uppercase");
    // Append file name at filenames.txt
    fs.appendFile(fileName, "uppercase.txt\n", (err) => {
      if (err) {
        return callback(err);
      }
      callback(null, filepath);
    });
  });
}

// Function to convert into lowercase and splits it into sentances
function lowercaseSplit(file, callback) {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      return callback(err);
    }
    // converts it into lowercase and splits the content
    let contentToLowercase = data.toLowerCase().split(".").join();
    // filepath given to use in writeFile and store the name of the file in filenames.txt
    let filepath = path.join(__dirname, "lowercase.txt");
    // appends the name of the lowercase file in filenames.txt
    fs.writeFile(filepath, contentToLowercase, (err) => {
      if (err) {
        callback(err);
      }
      // here it will append the name of the lowercase file to filenames.txt
      fs.appendFile(fileName, "lowercase.txt\n", (err) => {
        if (err) {
          callback(err);
        }

        callback(null, file);
      });
    });
  });
}

// function to sort the content of a file
function sortAndWriteFile(file, callback) {
  // first it will read the content which was produced by function lowerCaseSplit
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      callback(err);
    }
    // to sort the data we are converting it into array to sort lexicographically
    let sortedData = data.split(".").sort().join();
    // filepath to use in writefile to create a sorted.txt and in appendfile name
    let filepath = path.join(__dirname, "sorted.txt");
    fs.writeFile(filepath, sortedData, (err) => {
      if (err) {
        callback(err);
      }
      // append the name of the file to filnames.txt
      fs.appendFile(fileName, "sorted.txt\n", (err) => {
        if (err) {
          callback(err);
        }
        callback(null);
      });
    });
  });
}

// function to delete all the files which we have created
function deleteAllFiles(callback) {
  console.log("Deleting files listed in fileName");
  // reads file name which we have created in the above function asynchronously
  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
      return callback(err);
    }
    // file name inside filenames.txt will get into form of array to iterate a loop
    let allFiles = data.split("\n");
    allFiles.forEach((file) => {
      // deletes file asynchronously after iterating name of the file
      fs.unlink(file, (err) => {
        if (err) {
          return callback(err);
        }
        // whatever the files get deleted it get consoled
        console.log(`Files ${file} deleted`);
      });
    });
  });
}

module.exports = {
  readFile,
  uppercaseAndWriteFile,
  lowercaseSplit,
  sortAndWriteFile,
  deleteAllFiles,
};
