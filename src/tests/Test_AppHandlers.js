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

        QUnit.test("test callback query custom code event", function (assert) {
            that.test_handelCallbackQueryCustomCodeEvent();
            assert.ok(true, "custom code event test done");
        });

        QUnit.test("test bot command", function (assert) {
            const commands = ['/start', '/start help', '/help', '/about'];
            commands.forEach((command) => {
                that.test_handelBotCommand(command);
                assert.ok(true, `bot command ${command} test done`);
            });
        });

        QUnit.test("test notfound command throw error", function (assert) {
            assert.throws(() => {
                that.test_handelBotCommand("/notfound");
            }, "throws error");
        });

        QUnit.test("test callback query action event", function (assert) {
            that.test_handelCallbackQueryActionEvent();
            assert.ok(true, "action event test done");
        });
    }

    test_handelBotCommand(text) {
        let e = {
            postData: {
                contents: JSON.stringify({
                    message: {
                        entities: [{ type: "bot_command" }],
                        from: { id: this.chatId },
                        text: text
                    }
                })
            }
        };
        return this.handlers.handelDoPost(e);
    }

    test_handelCallbackQueryCustomCodeEvent() {
        let e = {
            postData: {
                contents: JSON.stringify({
                    callback_query: {
                        from: { id: this.chatId, language_code: this.DEFAULT_LANGUAGE_CODE },
                        data: 'code=whoami'
                    }
                })
            }
        };

        return this.handlers.handelDoPost(e);
    }

    test_handelCallbackQueryActionEvent() {
        let e = {
            postData: {
                contents: JSON.stringify({
                    callback_query: {
                        from: { id: this.chatId, language_code: this.DEFAULT_LANGUAGE_CODE },
                        data: 'action=start'
                    }
                })
            }
        };

        return this.handlers.handelDoPost(e);
    }

    test_doAction(action) {
        return this.handlers.doAction({
            'name': action,
            'chat_id': this.chatId,
            'language_code': this.DEFAULT_LANGUAGE_CODE
        });
    }
}

