/**
 * Open free code.
 */
class TelegramBotClient {
  constructor(botToken = '') {
    this.telegramEnpBaseUrl = "https://api.telegram.org/bot" + botToken;
  }

  /**
   * Post sendMessage to the API endpoint
   * 
   * @param requestOptions The sendMessage paramters, see: https://core.telegram.org/bots/api#sendmessage 
   */
  sendMessage(payload = {
    method: "sendMessage",
    chat_id: '',
    message_thread_id: null,
    text: '..🫢🫢..',
    parse_mode: "HTML",
    entities: null,
    disable_web_page_preview: true,
    disable_notification: true,
    protect_content: false,
    reply_to_message_id: null,
    allow_sending_without_reply: true,
    reply_markup: {}
  }) {
    var data = {
      method: "post",
      payload: payload
    };

    var url = this.getApiBaseUrl() + "/sendMessage";
    return UrlFetchApp.fetch(url, data);
  }

  //forwardMessage
  forwardMessage(requestOptions = {}) {
    var data = {
      'chat_id': String(requestOptions.chat_id),
      'message_thread_id': requestOptions.message_thread_id,
      'from_chat_id': String(requestOptions.from_chat_id),
      'disable_notification': requestOptions.disable_notification || true,
      'protect_content': requestOptions.protect_content || false,
      'message_id': parseInt(requestOptions.message_id) || null
    };

    var options = {
      'method': 'post',
      'contentType': 'application/json',
      // Convert the JavaScript object to a JSON string.
      'payload': JSON.stringify(data)
    };

    var url = this.getApiBaseUrl() + `/forwardMessage`;
    return UrlFetchApp.fetch(url, options);
  }

  /**
   * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
   * 
   * https://core.telegram.org/bots/api#sendanimation
   */
  sendAnimation(requestOptions) {
    var data = {
      'chat_id': String(requestOptions.chat_id),
      'animation': requestOptions.animation,
      'duration': requestOptions.duration,
      'width': requestOptions.width,
      'height': requestOptions.height,
      'thumbnail': requestOptions.thumbnail,
      'caption': requestOptions.caption,
      'parse_mode': requestOptions.parse_mode || "Markdown",
      'has_spoiler': requestOptions.has_spoiler || false,
      'supports_streaming': requestOptions.supports_streaming || false,
      'disable_notification': requestOptions.disable_notification || true,
      'protect_content': requestOptions.protect_content || false,
      'reply_to_message_id': requestOptions.reply_to_message_id || null,
      'allow_sending_without_reply': requestOptions.allow_sending_without_reply || true,
      'reply_markup': requestOptions.reply_markup || {}
    };

    var options = {
      'method': 'post',
      'contentType': 'application/json', //multipart/form-data
      // Convert the JavaScript object to a JSON string.
      'payload': JSON.stringify(data)
    };

    var url = this.getApiBaseUrl() + `/sendAnimation`;
    return UrlFetchApp.fetch(url, options);
  }

  /**
   * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
   * 
   * https://core.telegram.org/bots/api#sendvideo
   */
  sendVideo(requestOptions) {
    var data = {
      'chat_id': requestOptions.chat_id,
      'video': requestOptions.video,
      'duration': requestOptions.duration,
      'width': requestOptions.width,
      'height': requestOptions.height,
      'thumbnail': requestOptions.thumbnail,
      'caption': requestOptions.caption,
      'parse_mode': requestOptions.parse_mode || "Markdown",
      'has_spoiler': requestOptions.has_spoiler || false,
      'supports_streaming': requestOptions.supports_streaming || false,
      'disable_notification': requestOptions.disable_notification || true,
      'protect_content': requestOptions.protect_content || false,
      'reply_to_message_id': requestOptions.reply_to_message_id || null,
      'allow_sending_without_reply': requestOptions.allow_sending_without_reply || true,
      'reply_markup': requestOptions.reply_markup || {}
    };

    var options = {
      'method': 'post',
      'contentType': 'application/json',
      // Convert the JavaScript object to a JSON string.
      'payload': JSON.stringify(data)
    };

    var url = this.getApiBaseUrl() + `/sendVideo`;
    return UrlFetchApp.fetch(url, options);
  }

  /**
   * Use this method to send photos. On success, the sent Message is returned.
   * 
   * https://core.telegram.org/bots/api#sendphoto
   */

  sendPhoto(requestOptions) {
    var data = {
      'chat_id': requestOptions.chat_id,
      'photo': requestOptions.photo,
      'caption': requestOptions.caption,
      'parse_mode': requestOptions.parse_mode || "HTML",
      'has_spoiler': requestOptions.has_spoiler || false,
      'disable_notification': requestOptions.disable_notification || true,
      'protect_content': requestOptions.protect_content || false,
      'reply_to_message_id': requestOptions.reply_to_message_id || null,
      'allow_sending_without_reply': requestOptions.allow_sending_without_reply || true,
      'reply_markup': requestOptions.reply_markup || {}
    };

    var options = {
      'method': 'post',
      'contentType': 'application/json',
      // Convert the JavaScript object to a JSON string.
      'payload': JSON.stringify(data)
    };

    var url = this.getApiBaseUrl() + `/sendPhoto`;
    return UrlFetchApp.fetch(url, options);
  }
  /**
   * Post editMessageMedia to the API endpoint
   * 
   * @param {object} requestOptions The editMessageMedia paramters, see: https://core.telegram.org/bots/api#editMessageMedia 
   */
  editMessageMedia(requestOptions) {
    var data = {
      'chat_id': requestOptions.chat_id,
      'media': requestOptions.media,
      'message_id': requestOptions.message_id,
      //'inline_message_id': requestOptions.inline_message_id || null,
      'reply_markup': requestOptions.reply_markup || {}
    };

    var options = {
      'method': 'post',
      'contentType': 'application/json',
      // Convert the JavaScript object to a JSON string.
      'payload': JSON.stringify(data)
    };

    var url = this.getApiBaseUrl() + `/editMessageMedia`;
    return UrlFetchApp.fetch(url, options);
  }

  /**
   * Post sendMediaGroup to the API endpoint
   * 
   * @param {object} requestOptions The sendMediaGroup paramters, see: https://core.telegram.org/bots/api#sendmediagroup 
   */
  sendMediaGroup(requestOptions) {
    var data = {
      'chat_id': requestOptions.chat_id,
      'media': requestOptions.media,
      'reply_to_message_id': requestOptions.reply_to_message_id,
      'disable_notification': requestOptions.disable_notification || true,
      'allow_sending_without_reply': requestOptions.allow_sending_without_reply || true
    };

    var options = {
      'method': 'post',
      'contentType': 'application/json',
      // Convert the JavaScript object to a JSON string.
      'payload': JSON.stringify(data)
    };

    var url = this.getApiBaseUrl() + `/sendMediaGroup`;
    return UrlFetchApp.fetch(url, options);
  }

  /**
   * Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   * https://core.telegram.org/bots/api#editmessagecaption
   */
  editMessageCaption(requestOptions) {
    var data = {
      method: "post",
      payload: {
        chat_id: requestOptions.chat_id,
        message_id: requestOptions.message_id,
        inline_message_id: requestOptions.inline_message_id || null,
        caption: requestOptions.caption || ':-)...',
        parse_mode: requestOptions.parse_mode || "HTML",
        caption_entities: requestOptions.caption_entities || null,
        reply_markup: requestOptions.reply_markup || {}
      }
    };
    var url = this.getApiBaseUrl() + "/editMessageCaption";
    return UrlFetchApp.fetch(url, data);
  }

  /**
   * Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success.
   * https://core.telegram.org/bots/api#setchatmenubutton
   */
  setChatMenuButton(chat_id, menu_button) {
    var data = {
      method: "post",
      payload: {
        method: "setChatMenuButton",
        chat_id: chat_id,
        menu_button: menu_button
      }
    };
    var url = this.getApiBaseUrl() + "/setChatMenuButton";
    return UrlFetchApp.fetch(url, data);
  }

  /**
   * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
   * https://core.telegram.org/bots/api#setchatstickerset
   */
  setChatStickerSet(chat_id, sticker_set_name) {
    var data = {
      method: "post",
      payload: {
        method: "setChatStickerSet",
        chat_id: chat_id,
        sticker_set_name: sticker_set_name
      }
    };
    var url = this.getApiBaseUrl() + "/setChatStickerSet";
    return UrlFetchApp.fetch(url, data);
  }

  unpinAllChatMessages(chat_id) {
    var data = {
      method: "post",
      payload: {
        method: "unpinAllChatMessages",
        chat_id: chat_id
      }
    };
    var url = this.getApiBaseUrl() + "/unpinAllChatMessages";
    return UrlFetchApp.fetch(url, data);
  }

  pinChatMessage(chat_id, message_id, disable_notification = true) {
    var data = {
      method: "post",
      payload: {
        method: "pinChatMessage",
        chat_id: String(chat_id),
        message_id: parseInt(message_id),
        disable_notification: disable_notification
      }
    };
    var url = this.getApiBaseUrl() + "/pinChatMessage";

    return UrlFetchApp.fetch(url, data);
  }

  setChatTitle(chat_id, title) {
    var data = {
      method: "post",
      payload: {
        method: "setChatTitle",
        chat_id: chat_id,
        title: title
      }
    };
    var url = this.getApiBaseUrl() + "/setChatTitle";
    return UrlFetchApp.fetch(url, data);
  }

  setMyName(name, language_code) {
    var data = {
      method: "post",
      payload: {
        method: "setMyName",
        name: name,
        language_code: language_code
      }
    };
    var url = this.getApiBaseUrl() + "/setMyName";
    return UrlFetchApp.fetch(url, data);

  }
  setMyDescription(description, language_code) {
    var data = {
      method: "post",
      payload: {
        method: "setMyDescription",
        description: description,
        language_code: language_code
      }
    };
    var url = this.getApiBaseUrl() + "/setMyDescription";
    return UrlFetchApp.fetch(url, data);
  }

  setMyShortDescription(short_description, language_code) {
    var data = {
      method: "post",
      payload: {
        method: "setMyShortDescription",
        short_description: short_description,
        language_code: language_code
      }
    };
    var url = this.getApiBaseUrl() + "/setMyShortDescription";
    return UrlFetchApp.fetch(url, data);
  }

  setMyCommands(commands, language_code) {
    var data = {
      method: "post",
      payload: {
        method: "setMyCommands",
        commands: commands,
        language_code: language_code
      }
    };
    var url = this.getApiBaseUrl() + "/setMyCommands";
    return UrlFetchApp.fetch(url, data);
  }

  getMe() {
    var url = this.getApiBaseUrl() + "/getMe";
    var response = UrlFetchApp.fetch(url);

    return response;
  }

  deleteMessage(chat_id, message_id) {
    var url = `${this.getApiBaseUrl()}/deleteMessage?chat_id=${chat_id}&message_id=${message_id}`;
    return UrlFetchApp.fetch(url);
  }

  copyMessage(from_chat_id, to_chat_id, message_id) {
    var data = {
      method: "post",
      payload: {
        method: "copyMessage",
        chat_id: String(to_chat_id),
        from_chat_id: String(from_chat_id),
        message_id: String(message_id),
      }
    };
    var url = this.getApiBaseUrl() + "/copyMessage";
    return UrlFetchApp.fetch(url, data);
  }

  /**
   * Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
   * https://core.telegram.org/bots/api#answercallbackquery
   */
  answerCallbackQuery(requestOptions) {
    var data = {
      method: "post",
      payload: {
        // Unique identifier for the query to be answered
        callback_query_id: String(requestOptions.callback_query_id),
        //The maximum amount of time in seconds that the result of the callback query may be cached client-side.
        cache_time: requestOptions.cache_time || 0,
        //Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters
        text: requestOptions.text || null,
        //If True, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false.
        show_alert: requestOptions.show_alert || false,
        //URL that will be opened by the user's client.
        url: requestOptions.url || null
      }
    };
    var url = this.getApiBaseUrl() + "/answerCallbackQuery";//?chat_id=" + chat_id;
    return UrlFetchApp.fetch(url, data);
  }


  /**
   * Post editMessageText to the API endpoint
   * 
   * @param {object} requestOptions The editMessageText paramters, see: https://core.telegram.org/bots/api#editmessagetext 
   */
  editMessageText(requestOptions) {
    var data = {
      method: "post",
      payload: {
        method: "editMessageText",
        chat_id: requestOptions.chat_id || null, //String(requestOptions.chat_id),
        message_id: requestOptions.message_id || null,
        inline_message_id: requestOptions.inline_message_id || null,
        text: requestOptions.text || "..",
        parse_mode: requestOptions.parse_mode || "HTML",
        entities: requestOptions.entities || null,
        disable_web_page_preview: requestOptions.disable_web_page_preview || true,
        reply_markup: requestOptions.reply_markup || {}
      }
    };

    var url = this.getApiBaseUrl() + "/editMessageText";//?chat_id=" + chat_id;
    return UrlFetchApp.fetch(url, data);
  }

  editMessageReplyMarkup(requestOptions) {
    var data = {
      method: "post",
      payload: {
        method: "editMessageReplyMarkup",
        chat_id: requestOptions.chat_id || null, //String(requestOptions.chat_id),
        message_id: requestOptions.message_id || null,
        inline_message_id: requestOptions.inline_message_id || null,
        reply_markup: requestOptions.reply_markup || {}
      }
    };

    var url = this.getApiBaseUrl() + "/editMessageReplyMarkup";//?chat_id=" + chat_id;
    return UrlFetchApp.fetch(url, data);
  }

  getApiBaseUrl() {
    return this.telegramEnpBaseUrl;
  }

  setWebhook(webAppUrl) {
    if (webAppUrl) {
      var url = this.getApiBaseUrl() + "/setWebhook?url=" + webAppUrl;
      var response = UrlFetchApp.fetch(url);
      return response;
    }
    else {
      throw new Error("webAppUrl paramter is null or empty!");
    }
  }

  deleteWebhook(webAppUrl) {
    if (webAppUrl) {
      var url = this.getApiBaseUrl() + "/deleteWebhook?url=" + webAppUrl;
      var response = UrlFetchApp.fetch(url);
      return response;
    }
    else {
      throw new Error("webAppUrl paramter is null or empty!");
    }
  }

  sendDice(chat_id, emoji, disable_notification, reply_to_message_id) {
    var url = `${this.getApiBaseUrl()}/sendDice?chat_id=${chat_id}`
      + `&disable_notification=${disable_notification}&reply_to_message_id=${reply_to_message_id}`
      + `&emoji=${emoji}`;
    return UrlFetchApp.fetch(url);
  }

  getChat(chat_id) {
    var url = `${this.getApiBaseUrl()}/getChat?chat_id=${chat_id}`;
    return UrlFetchApp.fetch(url);
  }

  getBusinessConnection(business_connection_id) {
    var url = `${this.getApiBaseUrl()}/getBusinessConnection?business_connection_id=${business_connection_id}`;
    return UrlFetchApp.fetch(url);
  }

  sendChatAction(chat_id, action) {
    var url = this.getApiBaseUrl() + `/sendChatAction?chat_id=${chat_id}&action=${action}`;
    return UrlFetchApp.fetch(url);
  }

  sendTypingChatAction(chat_id) {
    this.sendChatAction(chat_id, "typing");
  }
  sendUploadPhotoChatAction(chat_id) {
    this.sendChatAction(chat_id, "upload_photo");
  }
  sendRecordVideoChatAction(chat_id) {
    this.sendChatAction(chat_id, "record_video");
  }
  sendUploadVideogChatAction(chat_id) {
    this.sendChatAction(chat_id, "upload_video");
  }
  sendRecordVoiceChatAction(chat_id) {
    this.sendChatAction(chat_id, "record_voice");
  }
  sendUploadVoiceChatAction(chat_id) {
    this.sendChatAction(chat_id, "upload_voice");
  }
  sendUploadDocumentChatAction(chat_id) {
    this.sendChatAction(chat_id, "upload_document");
  }
  sendChooseStickerChatAction(chat_id) {
    this.sendChatAction(chat_id, "choose_sticker");
  }
  sendFindLocationChatAction(chat_id) {
    this.sendChatAction(chat_id, "find_location");
  }
  sendRecordVideoNoteChatAction(chat_id) {
    this.sendChatAction(chat_id, "record_video_note");
  }
  sendUploadVideoNoteChatAction(chat_id) {
    this.sendChatAction(chat_id, "upload_video_note");
  }
}