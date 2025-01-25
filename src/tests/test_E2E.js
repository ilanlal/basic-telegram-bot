class Test_E2E {
    constructor() {
        // Imports the following functions:
        // ok, equal, notEqual, deepEqual, notDeepEqual, strictEqual,
        // notStrictEqual, throws, module, test, asyncTest, expect
        //QUnit.helpers(this);
        QUnit.module(`E2E`);

        const scriptProperties = PropertiesService.getScriptProperties();
        const botToken = scriptProperties.getProperty('BOT_TOKEN');
        this.chatId = scriptProperties.getProperty('ADMIN_CHAT_ID');
        this.botClient = new TelegramBotClient(botToken);

        this.runTests();
    }

    runTests() {
        let that = this;
        QUnit.test("test 'start' message event", function (assert) {
            that.test_doAction('start');
            assert.ok(true, "resource start test");
        });

        QUnit.test("test 'help' message event", function (assert) {
            that.test_doAction('help');
            assert.ok(true, "resource help test");
        });
    }

    test_doAction(action) {
        return doAction({
            'message': action,
            'chat_id': this.chatId,
            'language_code': DEFAULT_LANGUAGE_CODE
        });
    }
}

