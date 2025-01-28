class Test_AppSetup {
    constructor() {
        // Imports the following functions:
        // ok, equal, notEqual, deepEqual, notDeepEqual, strictEqual,
        // notStrictEqual, throws, module, test, asyncTest, expect
        //QUnit.helpers(this);
        this.botToken = AppSecrets.BOT_TOKEN;
        this.chat_id = AppSecrets.ADMIN_CHAT_ID;
        this.botClient = new TelegramBotClient(this.botToken);

        QUnit.module(`AppSetup`);
        this.runTests();
    }

    runTests() {
        let that = this;
        QUnit.test("test webhook", function (assert) {
            const result = that.test_getWebhookInfo();
            assert.ok(result, "webhook is live");
            if (result.url !== "") {
                assert.throws(() => that.test_setWebhook(), "webhook is already enabled");
            }
        });

        /*QUnit.test("test setMyBotInfo", function (assert) {
            that.test_setMyName();
            assert.ok(true, "setMyName test");
            that.test_setMyShortDescription();
            assert.ok(true, "setMyShortDescription test");
            that.test_setMyDescription();
            assert.ok(true, "setMyDescription test");
            that.test_setMyCommands();
            assert.ok(true, "setMyCommands test");
        });*/
    }

    test_setWebhook() {
        const response = this.botClient.setWebhook(AppSecrets.WEB_APP_URL);
        const result = JSON.parse(response).result;
        if (result.url !== "") {
            throw new Error("Webhook is already enabled");
        }
        return result;
    }

    test_getWebhookInfo() {
        const response = this.botClient.getWebhookInfo();
        const result = JSON.parse(response).result;
        if (result.url === "") {
            throw new Error("Webhook is disabled");
        }
        return result;
    }

    test_setMyName() {
        const langs = ["en", "es", undefined];
        langs.forEach(lang => {
            const resource = AppResources.getBotInfo({language_code: lang});
            this.botClient.setMyName({
                'name': resource.name,
                'language_code': lang
            });
        });
    }
    
    test_setMyShortDescription() {
        const langs = ["en", "es", undefined];
        langs.forEach(lang => {
            const resource = AppResources.getBotInfo({language_code: lang});
            this.botClient.setMyShortDescription({
                'description': resource.description,
                'language_code': lang
            });
        });
    }

    test_setMyDescription() {
        const langs = ["en", "es", undefined];
        langs.forEach(lang => {
            const resource = AppResources.getBotInfo({language_code: lang});
            this.botClient.setMyDescription({
                'description': resource.description,
                'language_code': lang
            });
        });
    }

    test_setMyCommands() {
        const langs = ["en", "es", undefined];
        langs.forEach(lang => {
            const resource = AppResources.getBotInfo({language_code: lang});
            this.botClient.setMyCommands({
                'commands': JSON.stringify(resource.commands),
                'language_code': lang
            });
        });
    }
}

