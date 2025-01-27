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
        QUnit.test("test doAction", function (assert) {
            that.test_doAction('start');
            assert.ok(true, "resource start test done");

            that.test_doAction('help');
            assert.ok(true, "resource help test done");

            that.test_doAction('about');
            assert.ok(true, "resource about test done");
        });

        QUnit.test("test handel message event", function (assert) {
            that.test_handelMessageEvent();
            assert.ok(true, "message event test done");
        });

        QUnit.test("test callback query event", function (assert) {
            that.test_handelCallbackQueryEvent();
            assert.ok(true, "callback query event test done");
        });

        QUnit.test("test doPost event", function (assert) {
            that.test_handelDoPost();
            assert.ok(true, "doPost event test done");
        });
    }

    test_handelDoPost() {
        let e = {
            postData: {
                contents: JSON.stringify({
                    message: {
                        entities: [{ type: "bot_command" }],
                        from: { id: this.chatId },
                        text: "/start"
                    }
                })
            }
        };
        return this.handlers.handelDoPost(e);
    }

    test_handelMessageEvent() {
        let message = {
            entities: [{ type: "bot_command" }],
            from: { id: this.chatId },
            text: "/start"
        };

        return this.handlers.handelMessageEvent(message);
    }

    test_handelCallbackQueryEvent() {
        let callback_query = {
            from: { id: this.chatId, language_code: this.DEFAULT_LANGUAGE_CODE },
            data: 'code=like'
        };

        return this.handlers.handelCallbackQueryEvent(callback_query);
    }

    test_doAction(action) {
        return this.handlers.doAction({
            'name': action,
            'chat_id': this.chatId,
            'language_code': this.DEFAULT_LANGUAGE_CODE
        });
    }
}

