function doGet(e) {
    QUnit.urlParams(e.parameter);
    QUnit.config({ title: "Basic Telegram Bot. QUnit tests." 
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
    new Test_AppHandlers();
}