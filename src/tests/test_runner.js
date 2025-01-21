function test_start(){
    Logger.log("test_start");
    test_logic_start();
    test_e2e_start();
}

function test_logic_start() {
    Logger.log("test_logic_start");
}

function test_e2e_start() {
    Logger.log("test_e2e_start");
    const scriptProperties = PropertiesService.getScriptProperties();
    const botToken = scriptProperties.getProperty('BOT_TOKEN');
    const chat_id = scriptProperties.getProperty('ADMIN_CHAT_ID');
    const webhookUrl = scriptProperties.getProperty('WEB_APP_URL');
    const test_e2e = new Test_E2E({ botToken, chat_id });
    
    test_e2e.test_setWebhook(webhookUrl);
    test_e2e.test_sendMessage();
}