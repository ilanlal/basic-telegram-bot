class AddonMenu {
    constructor() {
        this.menu = [];
    }

    addJsonStudionMenu() {
        const ui = SpreadsheetApp.getUi();

        // The label for a menu item should be in sentence case (only the first word capitalized).
        // see https://developers.google.com/apps-script/reference/base/menu#detailed-documentation
        ui.createMenu('Json')
            .addItem("✏️ Edit", 'AddonMenu.openDialogEditor')
            .addItem('💫 Range', 'AddonMenu.openSidebarRangeReport')
            .addSeparator()
            .addSubMenu(SpreadsheetApp.getUi().createMenu('{👁️} Format')
                .addItem('Minify', 'AddonMenu.minifyRange')
                .addItem('Prettify', 'AddonMenu.prettifyRange'))
            .addSeparator()
            .addItem('❔ Help', 'AddonMenu.openDialogHelp')
            .addToUi();
    }

    addTelegramBotMenu() {
        const ui = SpreadsheetApp.getUi();

        // The label for a menu item should be in sentence case (only the first word capitalized).
        // see https://developers.google.com/apps-script/reference/base/menu#detailed-documentation
        ui.createMenu('Telegram bot')
            .addItem("🤖 Setup a bot", 'AddonMenu.openSidebarBotSetup')
            .addSeparator()
            .addItem('⚙️ Project settings', 'AddonMenu.openDialogSetting')
            .addSeparator()
            .addItem('❔ Help', 'AddonMenu.openDialogHelp')
            .addToUi();
    }

    static minifyRange(e) {
        // Only show the sidebar if the user is an add-on
        if (e && e.authMode !== ScriptApp.AuthMode.NONE) {
            SpreadsheetApp.getUi().alert('Minifying the range (add-on)');
        }

        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        const lastRow = sheet.getLastRow();
        // get the last column of the sheet
        const lastColumn = sheet.getLastColumn();
        if (lastColumn > 26) {
            SpreadsheetApp.getActiveSpreadsheet().toast('The sheet has more than 26 columns', 'JSON Editor ‼️', 3);
            return;
        }

        const range = sheet.getActiveRange();
        const values = range.getValues();
        const newValues = values.map((row, i) => row.map((cell, j) => {
            // if range is out of last row, remove the cell from newValus 
            if (i > lastRow) {
                return;
            }
            try {
                return JSON.stringify(JSON.parse(cell));
            } catch (error) {
                return cell;
            }
        }));

        range.setValues(newValues);
    }

    static prettifyRange(e) {
        // Only show the sidebar if the user is an add-on
        if (e && e.authMode !== ScriptApp.AuthMode.NONE) {
            SpreadsheetApp.getUi().alert('Prettifying the range (add-on)');
        }
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        const lastRow = sheet.getLastRow();
        // get the last column of the sheet
        const lastColumn = sheet.getLastColumn();
        if (lastColumn > 26) {
            SpreadsheetApp.getActiveSpreadsheet().toast('The sheet has more than 26 columns', 'JSON Editor ‼️', 3);
            return;
        }
        const range = sheet.getActiveRange();
        const values = range.getValues();
        const newValues = values.map((row, i) => row.map((cell, j) => {
            // if range is out of last row, remove the cell from newValus 
            if (i > lastRow) {
                return;
            }
            try {
                return JSON.stringify(JSON.parse(cell), null, 2);
            } catch (error) {
                return cell;
            }
        }));

        range.setValues(newValues);
    }

    static openEditor(a1n) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        // set the active cell to the value of the a1n parameter
        //sheet.getRange(a1n).activate();
        const range = sheet.getRange(a1n);
        range.activateAsCurrentCell();
        return openDialogEditor();
    }

    static openSidebarBotSetup(e) {
        openSidebar(e, 'component/telegramBot/Index');
    }

    static openSidebarRangeReport(e) {
        openSidebar(e, 'component/rangeReport/Index');
    }

    static openDialogHelp(e) {
        openDialog(e, 'component/help/Index');
    }

    static openDialogSetting(e) {
        openDialog(e, 'component/setting/Index');
    }

    static openDialogEditor(e) {
        openDialog(e, 'component/editor/Index');
    }
}