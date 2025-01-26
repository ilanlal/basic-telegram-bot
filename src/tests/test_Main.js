function doGet(e) {
    QUnit.urlParams(e.parameter);
    QUnit.config({ title: "Basic Telegram Bot Apps Script project, doGet(e) Unit tests." 
        + ` v${Resources.version}`
     });
    QUnit.load(doGetMainTest);
    // see https://developers.google.com/apps-script/guides/services/tests#testing_doget_and_dopost
    return QUnit.getHtml();
}

function doGetMainTest() {
    new Test_AppSecrets();
    new Test_TelegramBotClient();
    new Test_AppResources();
    new Test_AppSetup();
    new Test_E2E();
}