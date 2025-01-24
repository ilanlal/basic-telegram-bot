// Description: This file contains the test cases for the TelegramBotClient class.
function test_sendMessage() {
    const scriptProperties = PropertiesService.getScriptProperties();
    const token = scriptProperties.getProperty('BOT_TOKEN');
    const chat_id = scriptProperties.getProperty('ADMIN_CHAT_ID');
    const botClient = new TelegramBotClient(token);
    const res = botClient.sendMessage({
        chat_id: chat_id,
        text: "Hi.. this is test"
    });

    const result = JSON.parse(res).result;
    Logger.log(result);
    return result.message_id;
}