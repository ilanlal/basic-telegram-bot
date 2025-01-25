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
                method: 'sendMessage',
                payload: {
                    text: 'Hello ‼️',
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
                method: 'sendMessage',
                payload: {
                    text: 'Help',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "like", callback_data: "code=like" }]
                        ]
                    }
                }
            },
            {
                message: 'about',
                method: 'sendMessage',
                payload: {
                    text: 'About',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "like", callback_data: "code=like" }]
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
                method: 'sendMessage',
                payload: {
                    text: 'Hola ‼️',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "YouTube™️", web_app: { url: "https://www.youtube.com" } }],
                            [{ text: "Quién soy", callback_data: "code=whoami" }],
                            [
                                { text: 'Ayuda', callback_data: "action=help" },
                                { text: 'Sobre', callback_data: "action=about" }
                            ]
                        ]
                    }
                }
            },
            {
                message: 'help',
                method: 'sendMessage',
                payload: {
                    text: 'Ayuda',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "me gusta", callback_data: "code=like" }]
                        ]
                    }
                }
            },
            {
                message: 'about',
                method: 'sendMessage',
                payload: {
                    text: 'Sobre',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "me gusta", callback_data: "code=like" }]
                        ]
                    }
                }
            }
        ],
    }
}