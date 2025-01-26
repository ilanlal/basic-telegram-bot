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
        // todo: Add test cases for AppSetup
    }
}

