// AddonMenu.gs
class AddonMenu {
    constructor() {
        this.menu = [];
    }

    addJsonStudionMenu(e) {
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

    addTelegramBotMenu(e) {
        // The label for a menu item should be in sentence case (only the first word capitalized).
        // see https://developers.google.com/apps-script/reference/base/menu#detailed-documentation

        const ui = SpreadsheetApp.getUi();
        // see https://developers.google.com/workspace/add-ons/concepts/menus
        if (e && e.authMode == ScriptApp.AuthMode.NONE) {
            // Add a normal menu item (works in all authorization modes).
            ui.createMenu('Bot')
                .addItem('❔ Help', 'AddonMenu.openDialogHelp')
                .addToUi();
        } else {
            ui.createMenu('Bot')
                .addItem('⚙️ Project setup', 'AddonMenu.openSetupDialog')
                .addItem("🤖 Send test message", 'AddonMenu.openTestMessageDialog')
                .addSeparator()
                .addItem('⚙️ Home page', 'onHomepage')
                .addSeparator()
                .addItem('❔ Help', 'AddonMenu.openDialogHelp')
                .addToUi();
        }
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
        return AddonMenu.openDialogEditor();
    }

    static openSetupDialog(e) {
        AddonMenu.openDialog(e, 'component/telegramBot/Index');
    }

    static openTestMessageDialog(e) {
        AddonMenu.openDialog(e, 'component/telegramBot/SendTestMessage');
    }

    static openSidebarBotSetup(e) {
        AddonMenu.openDialog(e, 'component/telegramBot/Index');
    }

    static openSidebarRangeReport(e) {
        AddonMenu.openSidebar(e, 'component/rangeReport/Index');
    }

    static openDialogHelp(e) {
        AddonMenu.openDialog(e, 'component/help/Index');
    }

    static openDialogSetting(e) {
        AddonMenu.openDialog(e, 'component/setting/Index');
    }

    static openDialogEditor(e) {
        AddonMenu.openDialog(e, 'component/editor/Index');
    }

    static openDialog(e, file, title = '(-:', width = 480, height = 600) {
        const htmlOutput = HtmlService
            .createTemplateFromFile(file)
            .evaluate()
            .setHeight(height)
            .setWidth(width);

        SpreadsheetApp.getUi()
            .showModalDialog(htmlOutput, title);
    }

    // This function is called when the user clicks on the "Open Sidebar" button in the add-on menu
    static openSidebar(e, file) {
        const htmlOutput = HtmlService
            .createTemplateFromFile(file)
            .evaluate()
            .setTitle('JSON Studio');
        SpreadsheetApp.getUi().showSidebar(htmlOutput);
    }
}