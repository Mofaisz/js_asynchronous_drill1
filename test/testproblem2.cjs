let {readFile,uppercaseAndWriteFile,lowercaseSplit,sortAndWriteFile, deleteAllFiles} = require("../problem2.cjs")

readFile((err, data) => {
    if (err) {
      console.log("Found error at reading file in function 1");
    }
    uppercaseAndWriteFile(data, (err, file) => {
      if (err) {
        console.log("Error at writing a file");
      }
      console.log("Uppercase file successfully created");
      // console.log(file)
      lowercaseSplit(file, (err, file) => {
        if (err) {
          console.log("Error at converting uppercase to lower case");
        }
        console.log("Succefully converted uppercase to lowercase");
  
        sortAndWriteFile(file, (err) => {
          if (err) {
            console.log("Error in sorting");
          }
          console.log("Successfully done sorting of content ");
  
          deleteAllFiles((err) => {});
        });
      });
    });
  });
  
  setTimeout(() => {
    console.log("All files got deleted");
  }, 100);
  