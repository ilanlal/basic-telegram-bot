const WEB_APP_URL = "https://script.google.com/macros/s/[Deployment ID]/exec";

/**
 * Get bot info
 */
function getMe() {
    // initilize bot client
    const botClient = new TelegramBotClient(AspSecrets.BOT_TOKEN);
    const me = botClient.getMe();
    Logger.log(me);
}

/**
 * Get webhook info
 */
function getWebhookInfo() {
    // initilize bot client
    const botClient = new TelegramBotClient(AspSecrets.BOT_TOKEN);
    const webhookInfo = botClient.getWebhookInfo();
    Logger.log(JSON.parse(webhookInfo).result);
}

/** 
 * Set webhook for the bot to receive updates
 */
function setWebhook() {
    // initilize bot client
    const botClient = new TelegramBotClient(AspSecrets.BOT_TOKEN);
    const webhookInfo = botClient.getWebhookInfo();
    const result = JSON.parse(webhookInfo).result;
    if (result.url !== "") {
        throw new Error("Webhook is already enabled");
    }
    const url = WEB_APP_URL.replace("[Deployment ID]", AspSecrets.DEPLOYMENT_ID);
    const response = botClient.setWebhook(url);
    Logger.log(JSON.parse(response).result);
}

/** 
 * Delete webhook for the bot to receive updates
 */
function deleteWebhook() {
    // initilize bot client
    const botClient = new TelegramBotClient(AspSecrets.BOT_TOKEN);
    const url = WEB_APP_URL.replace("[Deployment ID]", AspSecrets.DEPLOYMENT_ID);
    const response = botClient.deleteWebhook(url);
    Logger.log(JSON.parse(response).result);
}

function setMyBotInfo() {
    // initilize bot client
    const botClient = new TelegramBotClient(AspSecrets.BOT_TOKEN);
    langs = ["en", "es", undefined];
    langs.forEach(lang => {
        const resource = AspResources.getBotInfo({language_code: lang});
        botClient.setMyName({
            'name': resource.name,
            'language_code': lang
        });

        botClient.setMyShortDescription({
            'description': resource.short_description,
            'language_code': lang
        });

        botClient.setMyDescription({
            'description': resource.description,
            'language_code': lang
        });

        botClient.setMyCommands({
            'commands': JSON.stringify(resource.commands),
            'language_code': lang
        });
    });
}