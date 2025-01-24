class Test_TelegramBotClient {
    constructor() {
        // Imports the following functions:
        // ok, equal, notEqual, deepEqual, notDeepEqual, strictEqual,
        // notStrictEqual, throws, module, test, asyncTest, expect
        QUnit.helpers(this);
        this.module("TelegramBotClient");
        this.runTests();
    }

    runTests() {
        let that = this;
        this.test("test sendMessage", function (assert) {
            const messageId = that.test_sendMessage();
            that.test_deleteMessage(messageId);
            assert.ok(true, "sendMessage test");
        });

        this.test("test sendPhoto", function (assert) {
            const messageId = that.test_sendPhoto();
            that.test_deleteMessage(messageId);
            assert.ok(true, "sendPhoto test");
        });
    }

    test_sendMessage() {
        const scriptProperties = PropertiesService.getScriptProperties();
        const token = scriptProperties.getProperty('BOT_TOKEN');
        const chat_id = scriptProperties.getProperty('ADMIN_CHAT_ID');
        const botClient = new TelegramBotClient(token);
        const res = botClient.sendMessage({
            chat_id: chat_id,
            text: "Hi.. this is test"
        });

        const result = JSON.parse(res).result;
        return result.message_id;
    }

    test_sendPhoto() {
        const scriptProperties = PropertiesService.getScriptProperties();
        const token = scriptProperties.getProperty('BOT_TOKEN');
        const chat_id = scriptProperties.getProperty('ADMIN_CHAT_ID');
        const botClient = new TelegramBotClient(token);
        const res = botClient.sendPhoto({
            chat_id: chat_id,
            photo: "https://www.gstatic.com/webp/gallery/1.jpg",
            caption: "This is test photo"
        });

        const result = JSON.parse(res).result;
        return result.message_id;
    }

    test_deleteMessage(messageId) {
        const scriptProperties = PropertiesService.getScriptProperties();
        const token = scriptProperties.getProperty('BOT_TOKEN');
        const chat_id = scriptProperties.getProperty('ADMIN_CHAT_ID');
        const botClient = new TelegramBotClient(token);
        botClient.deleteMessage({
            chat_id: chat_id,
            message_id: messageId
        });
    }
}