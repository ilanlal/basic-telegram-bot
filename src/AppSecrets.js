class AppSecrets {
    static get BOT_TOKEN() {
        const scriptProperties = PropertiesService.getScriptProperties();
        return scriptProperties.getProperty('BOT_TOKEN');
    }

    static get WEB_APP_URL() {
        const scriptProperties = PropertiesService.getScriptProperties();
        return scriptProperties.getProperty('WEB_APP_URL');
    }

    static get DEPLOYMENT_ID() {
        const scriptProperties = PropertiesService.getScriptProperties();
        return scriptProperties.getProperty('DEPLOYMENT_ID');
    }

    static get ADMIN_CHAT_ID() {
        const scriptProperties = PropertiesService.getScriptProperties();
        return scriptProperties.getProperty('ADMIN_CHAT_ID');
    }
}