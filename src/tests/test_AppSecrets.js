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
            assert.ok(AppSecrets.BOT_TOKEN, "Bot token for test");
            assert.ok(AppSecrets.ADMIN_CHAT_ID, "Admin chat id for test");
            //assert.ok(AppSecrets.WEB_APP_URL, "Web app url for test");
            assert.ok(AppSecrets.DEPLOYMENT_ID, "Deployment id for test");
        });
    }
}

