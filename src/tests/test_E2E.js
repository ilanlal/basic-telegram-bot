class Test_E2E {
    constructor() {
        // Imports the following functions:
        // ok, equal, notEqual, deepEqual, notDeepEqual, strictEqual,
        // notStrictEqual, throws, module, test, asyncTest, expect
        QUnit.helpers(this);

        const scriptProperties = PropertiesService.getScriptProperties();
        this.botToken = scriptProperties.getProperty('BOT_TOKEN');
        this.chat_id = scriptProperties.getProperty('ADMIN_CHAT_ID');
        this.botClient = new TelegramBotClient(this.botToken);

        this.module("TelegramBotClient E2E Apps Script module");
        this.runTests();
    }
    
    runTests() {
        //this.test_setWebhook();
    }
}

