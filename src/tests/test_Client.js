class Test_TelegramBotClient {
    constructor() {
        // Imports the following functions:
        // ok, equal, notEqual, deepEqual, notDeepEqual, strictEqual,
        // notStrictEqual, throws, module, test, asyncTest, expect
        //QUnit.helpers(this);
        QUnit.module(`TelegramBotClient`);
        const scriptProperties = PropertiesService.getScriptProperties();
        const token = scriptProperties.getProperty('BOT_TOKEN');
        this.chatId = scriptProperties.getProperty('ADMIN_CHAT_ID');
        this.botClient = new TelegramBotClient(token);
        this.runTests();
    }

    runTests() {
        let that = this;
        QUnit.test("test sendMessage", function (assert) {
            that.test_sendMessage();
            assert.ok(true, "sendMessage test");
        });

        QUnit.test("test sendPhoto", function (assert) {
            that.test_sendPhoto();
            assert.ok(true, "sendPhoto test");
        });

        QUnit.test("test editMessageText", function (assert) {
            that.test_editMessageText();
            assert.ok(true, "editMessageText test");
        });

        QUnit.test("test deleteMessage", function (assert) {
            that.test_deleteMessage();
            assert.ok(true, "deleteMessage test");
        });
    }

    test_sendMessage() {
        const res = this.botClient.sendMessage({
            chat_id: this.chatId,
            text: "Hi.. this is test message from Google Apps Script",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Button 1", callback_data: "button1" }],
                    [{ text: "Button 2", callback_data: "button2" }]
                ]
            }
        });

        return JSON.parse(res).result;
    }

    test_sendPhoto() {
        const res = this.botClient.sendPhoto({
            chat_id: this.chatId,
            photo: "https://www.gstatic.com/webp/gallery/1.jpg",
            caption: "This is test photo (caption)"
        });

        return JSON.parse(res).result;
    }

    test_editMessageText() {
        const message = this.test_sendMessage();
        this.botClient.editMessageText({
            chat_id: this.chatId,
            message_id: message.message_id,
            text: "This is edited message",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Button X", callback_data: "buttonx" }],
                    [{ text: "Button Y", callback_data: "buttony" }]
                ]
            }
        });
    }

    test_deleteMessage() {   
        const message = this.test_sendMessage();
        this.botClient.deleteMessage({
            chat_id: this.chatId,
            message_id: message.message_id
        });
    }
}