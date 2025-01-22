const DEFAULT_LANGUAGE_CODE = 'en';

const Resources = {
    en: {
        start: {
            text: 'Hello ‼️',
            reply_markup: [[
                { text: "YouTube™️", web_app: { url: "https://www.youtube.com" } }
            ], [
                { text: 'Who am i', callback_data: "whoami" }
            ], [
                { text: 'Like', callback_data: "like" }
            ]]
        },
        help: { text: 'Help' },
        thanks: { text: 'Thank you' }
    },
    es: {
        start: {
            text: 'Hola ‼️',
            reply_markup: [[
                { text: "YouTube™️", web_app: { url: "https://www.youtube.com" } }
            ], [
                { text: 'quien soy yo', callback_data: "whoami" }
            ], [
                { text: 'Como', callback_data: "like" }
            ]]
        },
        help: { text: 'Ayuda' },
        thanks: { text: 'Gracias' }
    }
}

function getResource(language_code = DEFAULT_LANGUAGE_CODE) {
    if (Resources?.[language_code]) {
        return Resources[language_code];
    }

    return Resources.en;
}