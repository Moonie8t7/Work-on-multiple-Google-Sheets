const FOLDER_NAME_CONTAINING_SHEETS = "My Folder";
let folder;

/**
 * It gets all the spreadsheets in a folder, then runs a function, parsing their ID
 * as a parameter to be used in it..
 */
function getSheetsFromFolder() {
  try {
    folder = DriveApp.getFoldersByName(FOLDER_NAME_CONTAINING_SHEETS).next();
  } catch (err) {
    console.error(`Error getting folder: ${err}`);
  }
  const spreadsheets = folder.getFilesByType(MimeType.GOOGLE_SHEETS);
  while (spreadsheets.hasNext()) {
    const spreadsheet = spreadsheets.next();
    const sheetID = spreadsheet.getId();
    const sheetNames = doStuff(sheetID);
    /** In this example, we are just returning the sheet names */
    console.log(sheetNames);
  }
}

/**
 * It takes a sheet ID as an argument, opens the sheet, and will then run whatever
 * code you have in the function. In this case, we're just returning the Sheet Names
 * as an example.
 * @param sheetID - The ID of the spreadsheet you want to get the sheet names from.
 */
function doStuff(sheetID) {
  try {
    const ss = SpreadsheetApp.openById(sheetID);
    /** In this example we are just returning the sheet/tab names in the spreadsheet(s) in the folder */
    const sheets = ss.getSheets();
    let sheetNames = [];
    sheets.forEach((sheet) => {
      sheetNames.push(sheet.getName());
    });
    return sheetNames;
  } catch (err) {
    console.log(`Error getting sheet names: ${err}`);
  }
}
