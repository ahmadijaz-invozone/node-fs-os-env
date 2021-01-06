const os = require('os');
const fs = require('fs');
const env = require('dotenv').config();

// Get the Os Info and return it
const OsInfo = async function GetOsInformation() {
  return `Type = ${JSON.stringify(os.type())}\nUptime = ${JSON.stringify(
    os.uptime()
  )}\nMy Info = ${JSON.stringify(os.userInfo())}`;
};

// Check and create folder if it doesn't exists
const CheckDirectory = function CheckAndCreateDirectory(Directory) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(Directory)) {
      fs.mkdir(Directory, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve('Directory Created successfully!');
        }
      });
    } else resolve('Directory already Exists!');
  });
};

// Check file rights at given path with given rights
const CheckFileRights = function CheckRightsAtFilePath(FilePath, Right) {
  return new Promise((resolve, reject) => {
    fs.access(FilePath, Right, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('Successful.');
      }
    });
  });
};

// write given content to file in a given path
const WriteFile = function WriteFileContentToFilePath(FileContent, FilePath) {
  return new Promise((resolve, reject) => {
    CheckFileRights(FilePath, fs.constants.F_OK)
      .then(() => {
        resolve('File already Exists!');
      })
      .catch(() => {
        fs.writeFile(FilePath, FileContent, (err) => {
          if (err) reject(err);
          else resolve('Successful!');
        });
      });
  });
};

// read file from the given path
const ReadFile = function ReadFileContentFromFilePath(FilePath) {
  return new Promise((resolve, reject) => {
    CheckFileRights(FilePath, fs.constants.R_OK)
      .then(() => {
        fs.readFile(FilePath, 'utf8', (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// main function uses above all function
const StoreInfoToFile = async function GetOsInfoWriteToFileThenReadFromFile() {
  try {
    const FileContent = await OsInfo();
    const Directory = os.homedir + env.parsed.FILE_PATH;
    const FilePath = Directory + env.parsed.FILE_NAME;

    console.log('\nCreate Directory : ');
    await CheckDirectory(Directory)
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('\nWrite File : ');
    await WriteFile(FileContent, FilePath)
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log('\nRead File : ');

    ReadFile(FilePath)
      .then((success) => {
        console.log(`${success}\n`);
      })
      .catch((error) => {
        console.log(`${error}\n`);
      });
  } catch (error) {
    console.log(`${error}\n`);
  }
};

// Calling the main function
StoreInfoToFile();
