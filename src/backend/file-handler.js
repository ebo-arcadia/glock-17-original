// how to use the File module to read and write files with node?
// what is non-blocking I/O and why use it?
// what is asynchronous and synchronous functions?
// I/O: input & output, read file, write a file
// blocking, multiple users executing same actions to the function in a single thread at the same time. other uses' calls
// have to wait for the prior user's execution completed
// non-blocking, using call back functions to process other calls while waiting for the prior call to be executed

// non-blocking approach file handling
const fs = require("fs");

fs.readFile(`${__dirname}/../data/input.txt`, "utf-8", (err, content1) => {
  if (err) {
    console.warn(err);
  } else {
    console.info("non-blocking callback 1: ", content1);
    fs.readFile(`${__dirname}/../data/input1.txt`, "utf-8", (err, content2) => {
      console.info("non-blocking callback 2: ", content2);
      if (err) {
        console.warn(err);
      } else {
        fs.writeFile(
          `${__dirname}/../data/output.txt`,
          `${content1}\n${content2}`,
          "utf8",
          (callback) => {
            console.info("new file has been written");
          }
        );
      }
    });
  }
});
console.log("non-blocking testing. this line runs anyway. no waiting!");
