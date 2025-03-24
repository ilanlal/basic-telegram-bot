// Code.gs
function fetchAppSecrets() {
    const scriptProperties = PropertiesService.getScriptProperties();
    const secrets = scriptProperties.getProperties();
    return secrets;
}

function saveAppSecrets(secrets) {
    const scriptProperties = PropertiesService.getScriptProperties();
    scriptProperties.setProperties(secrets);
}