/// <reference path="AspSecrets.js" />
/// <reference path="AspResources.js" />
/// <reference path="lib/TelegramBotClient.js" />

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