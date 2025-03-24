// AspSecrets.gs
class AspSecrets {
    static get BOT_TOKEN() {
        const scriptProperties = PropertiesService.getScriptProperties();
        return scriptProperties.getProperty('BOT_TOKEN');
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