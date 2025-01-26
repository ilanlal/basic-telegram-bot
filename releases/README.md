# Releases of the project
You can use the `TelegramBotClient` class to interact with the Telegram Bot API. The class provides methods to send messages, edit messages, and manage the bot's webhook. The class is available as a library in Google Apps Script. To use it, follow the instructions below.

## Quick start
### Add the library to your Apps Script project
The class is available as a library in Google Apps Script. To use it, follow these steps:

1. Open the Apps Script editor.
2. Click on the `+` icon to create a new script.
3. In the Apps Script editor, click on the menu item `Resources > Libraries...`.
4. In the "Add a library" field, enter the Script ID `1DDZlfXvzArILhaX1IPakwcrPXW-aaMatA3JRJYmlFaBKZsUaKen7F5-y` and click "Add".
5. In the "Version" dropdown, select the latest version of the library. If you want to use a specific version, select it from the dropdown. selecting the 'head' will always give you the latest version.
6. Click "Save".

Now you can use the `TelegramBotClient` class in your Apps Script project. Here is an example of how to use it:

```javascript
function sendHelloWorld() {
    // Replace the placeholders with your chat_id and bot token
    const chat_id = '[YOUR_CHAT_ID]';
    const token = '[YOUR_BOT_TOKEN]';

    // Create a new instance of the TelegramBotClient class
    const client = new TelegramBotClient(token);
    const text = 'Hello, world!';
    // Send a message to the chat
    const response = client.sendMessage({chat_id, text});
    Logger.log(response);
}
```


## Overview
This directory contains the releases of the project. Each release is a directory with the following structure:

- `README.md`: a description of the release.
- `src/`: the source code of the release.

## Releases

- [v1.0.0](v1.0.0/README.md)
- [v1.0.1](v1.0.1/README.md) - vnext

