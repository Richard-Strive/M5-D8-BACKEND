const { readJSON, writeJSON } = require("fs-extra");
const { join } = require("path");

const booksPath = join(__dirname, "./attendees.json");
const attendeesPath = join(__dirname, "./attendees.json");

const readDB = async (filePath) => {
  try {
    const fileJson = await readJSON(filePath);
    return fileJson;
  } catch (error) {
    throw new Error(error);
  }
};

const writeDB = async (filePath, fileContent) => {
  try {
    await writeJSON(filePath, fileContent);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAttendees: async () => readDB(attendeesPath),
  writeAttendees: async (booksData) => writeDB(attendeesPath, booksData),
  //   getcomments: async () => readDB(commentsPath),
  //   writecomments: async (commentsData) => writeDB(commentsPath, commentsData),
};
