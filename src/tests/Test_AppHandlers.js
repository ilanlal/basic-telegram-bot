class Test_AppHandlers {
    constructor() {
        // Imports the following functions:
        // ok, equal, notEqual, deepEqual, notDeepEqual, strictEqual,
        // notStrictEqual, throws, module, test, asyncTest, expect
        //QUnit.helpers(this);
        QUnit.module(`AppHandlers`);
        this.DEFAULT_LANGUAGE_CODE = 'en';
        this.handlers = new AppHandlers();
        this.chatId = AppSecrets.ADMIN_CHAT_ID;
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
        return this.handlers.doAction({
            'name': action,
            'chat_id': this.chatId,
            'language_code': this.DEFAULT_LANGUAGE_CODE
        });
    }
}

