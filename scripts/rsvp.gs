// RSVP writer for the Nikkah invitation.
//
// 1. Create a Google Sheet.
// 2. Extensions > Apps Script, replace the sample code with this file, and save.
// 3. Deploy > New deployment > Web app.
//    Execute as: Me
//    Who has access: Anyone
// 4. Copy the Web app URL (it ends in /exec) into VITE_RSVP_URL.

var SHEET_NAME = 'RSVPs';

function doPost(e) {
  var sheet = getSheet_();
  var params = (e && e.parameter) || {};

  sheet.appendRow([
    new Date(),
    params.response || '',
    params.name || '',
    params.phone || '',
    params.plusOne || '',
    params.plusOneName || '',
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function getSheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Response',
      'Name',
      'Phone',
      'Plus one',
      'Plus one name',
    ]);
  }

  return sheet;
}
