function doGet(e) {
    QUnit.urlParams(e.parameter);
    QUnit.config({ title: "Basic Telegram Bot Apps Script project, doGet(e) Unit tests." });
    QUnit.load(doGetMainTest);
    // see https://developers.google.com/apps-script/guides/services/tests#testing_doget_and_dopost
    return QUnit.getHtml();
}

function doGetMainTest() {
    new Test_Logic();
    new Test_ProjectState();
    new Test_TelegramBotClient();
    new Test_E2E();
}