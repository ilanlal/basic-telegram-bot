/// <reference path="../../lib/TelegramBotClient.js" />
/// <reference path="../../AspSecrets.js" />
// Code.gs
const WEB_APP_URL = "https://script.google.com/macros/s/[Deployment ID]/exec";

/**
 * Get bot info
 */
function getMe() {
    // initilize bot client
    const botClient = new TelegramBotClient(AspSecrets.BOT_TOKEN);
    const response = botClient.getMe();
    return JSON.parse(response.getContentText());
}

/**
 * Get webhook info
 */
function getWebhookInfo() {
    // initilize bot client
    const botClient = new TelegramBotClient(AspSecrets.BOT_TOKEN);
    const response = botClient.getWebhookInfo();
    return JSON.parse(response.getContentText());
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
    return JSON.parse(response.getContentText());
}

/** 
 * Delete webhook for the bot to receive updates
 */
function deleteWebhook() {
    // initilize bot client
    const botClient = new TelegramBotClient(AspSecrets.BOT_TOKEN);
    const url = WEB_APP_URL.replace("[Deployment ID]", AspSecrets.DEPLOYMENT_ID);
    const response = botClient.deleteWebhook(url);
    return JSON.parse(response.getContentText());
}

/**
 * Send message to a chat
 * @param {string} chatId
 * @param {string} text
 * @param {'HTML'|'Markdown'|'MarkdownV2'|'None'} parseMode
 * @returns {Object} message object. See https://core.telegram.org/bots/api#message
 */
function sendMessage(chatId, text, parseMode) {
    // initilize bot client
    const botClient = new TelegramBotClient(AspSecrets.BOT_TOKEN);
    const response = botClient.sendMessage({
        chat_id: chatId,
        text: text,
        parse_mode: parseMode
    });
    return JSON.parse(response.getContentText());
}