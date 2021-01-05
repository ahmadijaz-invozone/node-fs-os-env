const os = require("os");
const fs = require("fs");
const env = require("dotenv").config();

const OsInfo = function GetOsInformation() {
  return (
    "Type = " +
    JSON.stringify(os.type()) +
    "\nUptime = " +
    JSON.stringify(os.uptime()) +
    "\nMy Info = " +
    JSON.stringify(os.userInfo())
  );
};

// write given content to file in a given path 
const WriteFile = function WriteFileContentToFilePath(FileContent, FilePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(FilePath, FileContent, function (err) {
      if (err) reject(err);
      else resolve("Successful.");
    });
  });
};

// read file from the given path
const ReadFile = function ReadFileContentFromFilePath(FilePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(FilePath, "utf8", function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

//main function uses above all function
const StoreInfoToFile = function GetOsInfoWriteToFileThenReadFromFile() {
  try {
    const FileContent = OsInfo();
    const FilePath = env.parsed.FILE_PATH + "os_info.txt";

    console.log("\nWrite File : ");
    WriteFile(FileContent, FilePath)
      .then((success) => {
        console.log(success);
        console.log("\nRead File : ");

        ReadFile(FilePath)
          .then((success) => {
            console.log(success + '\n');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

//Calling the main function
StoreInfoToFile();
