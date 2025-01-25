const DEFAULT_LANGUAGE_CODE = 'en';

function getResource({ language_code }) {
    if (language_code && Resources?.[language_code]) {
        return Resources[language_code];
    }

    return Resources.en;
}

function getBotInfo({ language_code }) {
    return getResource({ language_code })?.bot;
}

function getAction({ message, language_code }) {
    return getResource({ language_code })?.actions?.find((a) => a.message === message);
}