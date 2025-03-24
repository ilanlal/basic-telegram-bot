class AspSpreadsheet {
    constructor(language_code) {
        this.LANG_COL_INDEX = this.findLangColIndex(language_code);
    }
    
    static get EVENT_LOG_SHEET_NAME() {
        return "Event Logs";
    }

    static get USERS_SHEET_NAME() {
        return "Users";
    }

    static get RESOURCES_SHEET_NAME() {
        return "Resources";
    }

    static writeEvent({ dc, action, chat_id, content, event }) {
        const sheet = this.getEventLogSheet_();
        const datestring = new Date().toISOString();
        sheet.appendRow([datestring, dc, action, chat_id, content, event]);
    }

    static writeError({ dc, action, chat_id, content, event }) {
        const sheet = this.getEventLogSheet_();
        const datestring = new Date().toISOString();
        sheet.appendRow([datestring, dc, action, chat_id, content, event]);
    }

    static getEventLogSheet_() {
        const monthAsNumber = new Date().getMonth() + 1;
        return SpreadsheetApp
            .getActiveSpreadsheet()
            .getSheetByName(this.EVENT_LOG_SHEET_NAME + ' ' + monthAsNumber)
            ?? SpreadsheetApp
                .getActiveSpreadsheet()
                .insertSheet(this.EVENT_LOG_SHEET_NAME + ' ' + monthAsNumber, 0)
                .appendRow(['Created On', 'DC', 'Action', 'chat_id', 'content', 'event']);
    }

    findLangColIndex(langCodeText) {
        const range = this.getResourcesDataRange_();

        const firstRow = range.getValues()[0];
        for (var col = 1; col < firstRow.length; col++) {
            if (firstRow[col] == langCodeText) {
                return col;
            }
        }
        // Default when not found
        return 1;
    }

    addUser(chat_id, data) {
        const sheet = this.getUsersSheet_();
        const datestring = new Date().toISOString();

        const user = [datestring, chat_id, data.username, data.first_name, data.last_name, data.language_code, data];
        sheet.appendRow(user);

        return persone;
    }

    getUserById(id) {
        const range = this.getUsersDataRange_();
        const values = range.getValues();
        for (var row = 0; row < values.length; row++) {
            if (values[row][1] == id) { //chat_id
                return values[row]; //user row
            }
        }
        return null;
    }

    getResourceByKey(key) {
        const range = this.getResourcesDataRange_();
        const values = range.getValues();
        for (var row = 0; row < values.length; row++) {
            if (values[row][0] == key) {
                return values[row][this.LANG_COL_INDEX];
            }
        }
        return null;
    }

    getResourcesDataRange_() {
        const sheet = this.getResourcesSheet_();
        return sheet.getDataRange();
    }

    getResourcesSheet_() {
        return SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName(this.RESOURCES_SHEET_NAME)
            ?? SpreadsheetApp
                .getActiveSpreadsheet()
                .insertSheet(this.RESOURCES_SHEET_NAME, 0)
                .appendRow(['KEY', 'en'])
                .appendRow(['sampel1', 'Hello World..'])
                .appendRow(['sampel2', 'Pleas select..']);
    }

    getUsersDataRange_() {
        const sheet = this.getUsersSheet_();
        return sheet.getDataRange();
    }

    getUsersSheet_() {
        return SpreadsheetApp
            .getActiveSpreadsheet()
            .getSheetByName(this.USERS_SHEET_NAME)
            ?? SpreadsheetApp
                .getActiveSpreadsheet()
                .insertSheet(this.USERS_SHEET_NAME, 0)
                .appendRow(['Created on', 'chat_id', 'username', 'First Name', 'Last Name', 'language_code', 'Data']);
    }
}
