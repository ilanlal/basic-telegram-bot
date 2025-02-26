class Test_TelegramBotClient {
    constructor() {
        // Imports the following functions:
        // ok, equal, notEqual, deepEqual, notDeepEqual, strictEqual,
        // notStrictEqual, throws, module, test, asyncTest, expect
        //QUnit.helpers(this);
        QUnit.module(`TelegramBotClient`);
        
        const token = AspSecrets.BOT_TOKEN;
        this.chatId = AspSecrets.ADMIN_CHAT_ID;
        this.botClient = new TelegramBotClient(token);
        this.runTests();
    }

    runTests() {
        let that = this;
        QUnit.test("test getMe", function (assert) {
            const result = that.test_getMe();
            assert.ok(result, "getMe test");
        });

        QUnit.test("test webhook operations", function (assert) {
            const result = that.test_getWebhookInfo();
            assert.ok(result, "getWebhookInfo test");
        });

        QUnit.test("test text message operations", function (assert) {
            let message = that._sendTextMessage();
            assert.ok(true, "sendMessage test");
            that.botClient.editMessageText({  
                chat_id: message.chat.id,
                message_id: message.message_id,
                text: "This is edited message text",
                reply_markup: message?.reply_markup
            });
            assert.ok(true, "editMessageText test");

            message = that._sendTextMessageWithInlineKeyboard();
            assert.ok(true, "sendMessage with inline keyboard test");

            that.botClient.editMessageReplyMarkup({
                chat_id: message.chat.id,
                message_id: message.message_id,
                text: "This is edited message text with new inline keyboard",
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "New 1", callback_data: "button1" }],
                        [{ text: "New 2", callback_data: "button2" }]
                    ]
                }
            });
            assert.ok(true, "editMessageReplyMarkup test");
        });

        QUnit.test("test photo & media operations", function (assert) {
            let message = that._sendPhotoMessage();
            assert.ok(true, "sendPhoto test");
            that.botClient.editMessageMedia({
                chat_id: message.chat.id,
                message_id: message.message_id,
                media: {
                    type: "photo",
                    media: "https://www.gstatic.com/webp/gallery/1.jpg",
                    caption: "This is edited photo message",
                    reply_markup: message?.reply_markup
                },
                reply_markup: message?.reply_markup
            });
            assert.ok(true, "editMessageMedia test");
            that.botClient.editMessageCaption({
                chat_id: message.chat.id,
                message_id: message.message_id,
                caption: "This is edited caption",
                reply_markup: message?.reply_markup
            });
            assert.ok(true, "editMessageCaption test");
            that.botClient.editMessageReplyMarkup({
                chat_id: message.chat.id,
                message_id: message.message_id,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "New 1", callback_data: "button1" }],
                        [{ text: "New 2", callback_data: "button2" }]
                    ]
                }
            });
            assert.ok(true, "editMessageReplyMarkup test");
        });

        QUnit.test("test sendMediaGroup", function (assert) {
            that.test_sendMediaGroup();
            assert.ok(true, "sendMediaGroup test");
        });

        QUnit.test("test deleteMessage", function (assert) {
            that.test_deleteMessage();
            assert.ok(true, "deleteMessage test");
        });
    }

    test_sendMediaGroup() {
        const response = this.botClient.sendMediaGroup({
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

    test_deleteMessage() {   
        const message = this._sendPhotoMessage();
        this.botClient.deleteMessage({
            chat_id: this.chatId,
            message_id: message.message_id
        });
    }

    test_getMe() {
        const me = this.botClient.getMe();
        return me;
    }

    test_getWebhookInfo() {
        const response = this.botClient.getWebhookInfo();
        const result = JSON.parse(response).result;
        return result;
    }

    _sendTextMessage() {
        const response = this.botClient.sendMessage({
            'chat_id': this.chatId,
            'text': 'Hello, World!'
        });

        return JSON.parse(response).result;
    }
    _sendTextMessageWithInlineKeyboard() {
        const response = this.botClient.sendMessage({
            'chat_id': this.chatId,
            'text': 'Hello, World!',
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
        const response = this.botClient.sendPhoto({
            'chat_id': this.chatId,
            'photo': 'https://source.unsplash.com/random/800x600',
            'caption': 'This is a photo message',
            'reply_markup': {
                inline_keyboard: [
                    [{ text: "Button 1", callback_data: "button1" }],
                    [{ text: "Button 2", callback_data: "button2" }]
                ]
            }
        });

        return JSON.parse(response).result;
    }
}