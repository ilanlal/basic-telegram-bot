function setMyBotInfo() {
}

/** Webhok for telegram bot */
function setWebhook() {
    // initilize bot client
    const botClient = new TelegramBotClient(AppSecrets.BOT_TOKEN);
    const url = AppSecrets.WEB_APP_URL;

    botClient.setWebhook(url);
}

function deleteWebhook() {
    // initilize bot client
    const botClient = new TelegramBotClient(AppSecrets.BOT_TOKEN);

    const url = AppSecrets.WEB_APP_URL;

    botClient.deleteWebhook(url);
}