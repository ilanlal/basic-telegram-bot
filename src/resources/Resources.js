const Resources = {
    version: '1.0.1',
    en: {
        bot: {
            name: 'Basic Telegram Bot',
            short_description: 'A simple bot that demonstrates the basic functionality of a Telegram bot.',
            description: 'This bot demonstrates the basic functionality of a Telegram bot. It provides the following commands:\n\n' +
                '/start - Start the bot\n' +
                '/help - Get help\n' +
                '/about - About the bot',
            commands: [
                {
                    command: '/start',
                    description: 'Start the bot'
                },
                {
                    command: '/help',
                    description: 'Get help'
                },
                {
                    command: '/about',
                    description: 'About the bot'
                }
            ]
        },
        actions: [
            {
                message: 'start',
                method: 'sendPhoto',
                payload: {
                    caption: 'Hello ‼️' + '\n\n'
                        + '<blockquote expandable>Expandable Block \n'
                        + 'This is a simple bot that demonstrates the basic functionality of a Telegram bot.'
                        + 'It provides the following commands:\n\n'
                        + '/start - Start the bot\n'
                        + '/help - Get help\n'
                        + '/about - About the bot'
                        + '</blockquote>',
                    photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "YouTube™️", web_app: { url: "https://www.youtube.com" } }],
                            [{ text: "Who am I", callback_data: "code=whoami" }],
                            [
                                { text: 'Help', callback_data: "action=help" },
                                { text: 'About', callback_data: "action=about" }
                            ]
                        ]
                    }
                }
            },
            {
                message: 'help',
                method: 'editMessageMedia',
                payload: {
                    caption: 'Hi there! How can I help you?',
                    parse_mode: 'HTML',
                    media: "https://www.gstatic.com/webp/gallery/2.jpg",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "BACK", callback_data: "action=start" }]
                        ]
                    }
                }
            },
            {
                message: 'about',
                method: 'editMessageMedia',
                payload: {
                    caption: 'Hi there! I am a simple bot that demonstrates the basic functionality of a Telegram bot.',
                    media: "https://www.gstatic.com/webp/gallery/3.jpg",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "BACK", callback_data: "action=start" }]
                        ]
                    }
                }
            }
        ],
    },
    es: {
        bot: {
            name: 'Bot básico de Telegram',
            short_description: 'Un bot simple que demuestra la funcionalidad básica de un bot de Telegram.',
            description: 'Este bot demuestra la funcionalidad básica de un bot de Telegram. Proporciona los siguientes comandos:\n\n' +
                '/start - Iniciar el bot\n' +
                '/help - Obtener ayuda\n' +
                '/about - Sobre el bot',
            commands: [
                {
                    command: '/start',
                    description: 'Iniciar el bot'
                },
                {
                    command: '/help',
                    description: 'Obtener ayuda'
                },
                {
                    command: '/about',
                    description: 'Sobre el bot'
                }
            ]
        },
        actions: [
            {
                message: 'start',
                method: 'sendPhoto',
                payload: {
                    caption: '¡Hola ‼️' + '\n\n'
                        + '<blockquote expandable>Bloque expandible \n'
                        + 'Este es un bot simple que demuestra la funcionalidad básica de un bot de Telegram.'
                        + 'Proporciona los siguientes comandos:\n\n'
                        + '/start - Iniciar el bot\n'
                        + '/help - Obtener ayuda\n'
                        + '/about - Sobre el bot'
                        + '</blockquote>',
                    photo: "https://www.gstatic.com/webp/gallery/1.jpg",
                    parse_mode: 'HTML', 
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "YouTube™️", web_app: { url: "https://www.youtube.com" } }],
                            [{ text: "Who am I", callback_data: "code=whoami" }],
                            [
                                { text: 'Help', callback_data: "action=help" },
                                { text: 'About', callback_data: "action=about" }
                            ]
                        ]
                    }
                }
            },
            {
                message: 'help',
                method: 'editMessageMedia',
                payload: {
                    caption: '¡Hola! ¿Cómo puedo ayudarte?',
                    parse_mode: 'HTML',
                    media: "https://www.gstatic.com/webp/gallery/2.jpg",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "ATRÁS", callback_data: "action=start" }]
                        ]
                    }
                }
            },
            {
                message: 'about',
                method: 'editMessageMedia',
                payload: {
                    caption: '¡Hola! Soy un bot simple que demuestra la funcionalidad básica de un bot de Telegram.',
                    media: "https://www.gstatic.com/webp/gallery/3.jpg",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "ATRÁS", callback_data: "action=start" }]
                        ]
                    }
                }
            }
        ],
    }
}