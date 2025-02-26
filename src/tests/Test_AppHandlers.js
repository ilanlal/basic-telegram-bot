class Test_AppHandlers {
    constructor() {
        // Imports the following functions:
        // ok, equal, notEqual, deepEqual, notDeepEqual, strictEqual,
        // notStrictEqual, throws, module, test, asyncTest, expect
        //QUnit.helpers(this);
        QUnit.module(`AppHandlers`);
        this.DEFAULT_LANGUAGE_CODE = 'en';
        this.handlers = new AspHandlers();
        this.chatId = AspSecrets.ADMIN_CHAT_ID;
        this.runTests();
    }

    runTests() {
        let that = this;
        QUnit.test("test doAction TextMessage as parent", function (assert) {
            that.test_doActionOnTextMessage('start');
            assert.ok(true, "resource start test done");

            that.test_doActionOnTextMessage('help');
            assert.ok(true, "resource help test done");

            that.test_doActionOnTextMessage('about');
            assert.ok(true, "resource about test done");
        });

        QUnit.test("test doAction Photo as parent", function (assert) {
            that.test_doActionOnMediaMessage('start');
            assert.ok(true, "resource start test done");

            that.test_doActionOnMediaMessage('help');
            assert.ok(true, "resource help test done");

            that.test_doActionOnMediaMessage('about');
            assert.ok(true, "resource about test done");
        });

        QUnit.test("test custom code event", function (assert) {
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
        const message = this._sendTextMessage();
        let e = {
            postData: {
                contents: JSON.stringify({
                    message: {
                        message_id: message.message_id,
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
        const message = this._sendTextMessage();
        let e = {
            postData: {
                contents: JSON.stringify({
                    callback_query: {
                        from: { id: this.chatId, language_code: this.DEFAULT_LANGUAGE_CODE },
                        data: 'code=whoami',
                        message: { message_id: message.message_id }
                    }
                })
            }
        };

        return this.handlers.handelDoPost(e);
    }

    test_handelCallbackQueryActionEvent() {
        const message = this._sendTextMessage();
        let e = {
            postData: {
                contents: JSON.stringify({
                    callback_query: {
                        from: { id: this.chatId, language_code: this.DEFAULT_LANGUAGE_CODE },
                        data: 'action=start',
                        message: { message_id: message.message_id }
                    }
                })
            }
        };

        return this.handlers.handelDoPost(e);
    }

    test_doActionOnTextMessage(action) {
        const message = this._sendTextMessageWithKeyboard();
        return this.handlers.doAction({
            'name': action,
            'chat_id': this.chatId,
            'language_code': this.DEFAULT_LANGUAGE_CODE,
            'message': message,
        });
    }
    test_doActionOnMediaMessage(action) {
        const message = this._sendPhotoMessage();
        return this.handlers.doAction({
            'name': action,
            'chat_id': this.chatId,
            'language_code': this.DEFAULT_LANGUAGE_CODE,
            'message': message,
        });
    }

    _sendTextMessage() {
        const response = this.handlers.botClient.sendMessage({
            'chat_id': this.chatId,
            'text': '/start'
        });

        return JSON.parse(response).result;
    }

    _sendTextMessageWithKeyboard() {
        const response = this.handlers.botClient.sendMessage({
            'chat_id': this.chatId,
            'text': '/start',
            'reply_markup': {
                inline_keyboard: [
                    [{ text: "Button 1", callback_data: "button1" }],
                    [{ text: "Button 2", callback_data: "button2" }]
                ]
            }
        });

        return JSON.parse(response).result;
    }

    _sendPhotoMessage() {
        const response = this.handlers.botClient.sendMediaGroup({
            chat_id: this.chatId,
            media: [
                {
                    type: "photo",
                    media: "https://www.gstatic.com/webp/gallery/1.jpg",
                    caption: "This is photo 1"
                },
                {
                    type: "photo",
                    media: "https://www.gstatic.com/webp/gallery/2.jpg",
                    caption: "This is photo 2"
                },
                {
                    type: "photo",
                    media: "https://www.gstatic.com/webp/gallery/3.jpg",
                    caption: "This is photo 3"
                },
                {
                    type: "photo",
                    media: "https://www.gstatic.com/webp/gallery/4.jpg",
                    caption: "This is photo 4"
                }
            ]
        });
        return JSON.parse(response).result;
    }
}

