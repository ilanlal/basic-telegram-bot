class Test_AppSecrets {
    constructor() {
        // Imports the following functions:
        // ok, equal, notEqual, deepEqual, notDeepEqual, strictEqual,
        // notStrictEqual, throws, module, test, asyncTest, expect
        //QUnit.helpers(this);
        QUnit.module(`AppSecrets`);

        this.botToken = AppSecrets.BOT_TOKEN;
        this.chat_id = AppSecrets.ADMIN_CHAT_ID;
        this.botClient = new TelegramBotClient(this.botToken);

        this.runTests();
    }
    runTests() {
        this.test_ProjectSecrests();
    }

    test_ProjectSecrests() {
        QUnit.test("test secrets properties..", function (assert) {
            assert.ok(AppSecrets.BOT_TOKEN, "TelegramBot token");
            assert.ok(AppSecrets.ADMIN_CHAT_ID, "chat_id for test (Optional)");
            assert.ok(AppSecrets.WEB_APP_URL, "Deployment web-app url, for webhook's");
        });
    }
}

