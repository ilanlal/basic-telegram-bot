function doGet(e) {
    QUnit.urlParams(e.parameter);
    QUnit.config({ title: "Basic Telegram Bot Apps Script project, Unit tests." });
    QUnit.load(testMain);
    return QUnit.getHtml();
}

function testMain() {
    var qunitHelpers = {};
    // Imports the following functions:
    // ok, equal, notEqual, deepEqual, notDeepEqual, strictEqual,
    // notStrictEqual, throws, module, test, asyncTest, expect
    QUnit.helpers(qunitHelpers);

    testProjectState(qunitHelpers);
    testResources(qunitHelpers);
}

function testProjectState(qu) {
    qu.module("Properties setup module");

    qu.test("test script properties..", function (assert) {
        const scriptProperties = PropertiesService.getScriptProperties();
        const botToken = scriptProperties.getProperty('BOT_TOKEN');
        const chat_id = scriptProperties.getProperty('ADMIN_CHAT_ID');
        const webhookUrl = scriptProperties.getProperty('WEB_APP_URL');
        assert.ok(botToken, "TelegramBot token");
        assert.ok(chat_id, "chat_id for test (Optional)");
        assert.ok(webhookUrl, "Deployment web-app url, for webhook's");
    });
}

function testResources(qu) {
    qu.module("Resources module");
    const lang_test_codes = ['en', 'es', 'ar', '', null, NaN, undefined];

    lang_test_codes.forEach((lang_code) => {
        qu.test(`test start key lang:${lang_code}`, function (assert) {
            let resource = getResource(lang_code);
            assert.ok(resource.start.text, "Response text to /start command lang_code=" + lang_code);
            assert.ok(resource.start.inline_keyboard, "Response keyboard to /start command lang_code=" + lang_code);
        });
    });
}

function _test_e2e_run() {
    Logger.log("test_e2e_run");
    const scriptProperties = PropertiesService.getScriptProperties();
    const botToken = scriptProperties.getProperty('BOT_TOKEN');
    const chat_id = scriptProperties.getProperty('ADMIN_CHAT_ID');
    const webhookUrl = scriptProperties.getProperty('WEB_APP_URL');
    const test_e2e = new Test_E2E({ botToken, chat_id });

    test_e2e.test_setWebhook(webhookUrl);
    test_e2e.test_sendMessage();
}