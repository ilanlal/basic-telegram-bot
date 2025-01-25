function setMyBotInfo() {
}

/** Webhok for telegram bot */
function setWebhook(webAppUrl) {
    // initilize bot client
    const scriptProperties = PropertiesService.getScriptProperties();
    const botToken = scriptProperties.getProperty('BOT_TOKEN');
    const botClient = new TelegramBotClient(botToken);
    const url = webAppUrl || scriptProperties.getProperty('WEB_APP_URL');

    botClient.setWebhook(url);
}

function deleteWebhook(webAppUrl) {
    // initilize bot client
    const scriptProperties = PropertiesService.getScriptProperties();
    const botToken = scriptProperties.getProperty('BOT_TOKEN');
    const botClient = new TelegramBotClient(botToken);
    const url = webAppUrl || scriptProperties.getProperty('WEB_APP_URL');

    botClient.deleteWebhook(url);
}