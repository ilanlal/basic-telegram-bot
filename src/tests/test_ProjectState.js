class Test_ProjectState {
    constructor() {
        // Imports the following functions:
        // ok, equal, notEqual, deepEqual, notDeepEqual, strictEqual,
        // notStrictEqual, throws, module, test, asyncTest, expect
        QUnit.helpers(this);

        const scriptProperties = PropertiesService.getScriptProperties();
        this.botToken = scriptProperties.getProperty('BOT_TOKEN');
        this.chat_id = scriptProperties.getProperty('ADMIN_CHAT_ID');
        this.botClient = new TelegramBotClient(this.botToken);

        this.module("Project setup module");
        this.runTests();
    }
    runTests() {
        this.test_ProjectProperties();
        //this.test_setWebhook();
    }

    test_ProjectProperties() {
        this.test("test script properties..", function (assert) {
            const scriptProperties = PropertiesService.getScriptProperties();
            const botToken = scriptProperties.getProperty('BOT_TOKEN');
            const chat_id = scriptProperties.getProperty('ADMIN_CHAT_ID');
            const webhookUrl = scriptProperties.getProperty('WEB_APP_URL');
            assert.ok(botToken, "TelegramBot token");
            assert.ok(chat_id, "chat_id for test (Optional)");
            assert.ok(webhookUrl, "Deployment web-app url, for webhook's");
        });
    }
}

