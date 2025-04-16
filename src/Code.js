/// <reference path="AspHandlers.js" />
// Code.gs
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}

function doPost(e) {
    try {
        const handler = new AspHandlers();
        handler.handelDoPost(e);
    } catch (error) {
        Logger.log(error);
        AspSpreadsheet.writeEvent({
            dc: "doPost",
            action: error.toString(),
            chat_id: null,
            content: error.toString(),
            event: e.postData.contents
        });
    }
}

/**
 * Callback for rendering the main card.
 * @return {CardService.Card} The card to show the user.
 */
function onHomepage(e) {
    const DEFAULT_INPUT_TEXT = '';
    const DEFAULT_OUTPUT_TEXT = '';
    const DEFAULT_ORIGIN_LAN = ''; // Empty string means detect langauge
    const DEFAULT_DESTINATION_LAN = 'en' // English

    return createSelectionCard(e, DEFAULT_ORIGIN_LAN, DEFAULT_DESTINATION_LAN, DEFAULT_INPUT_TEXT, DEFAULT_OUTPUT_TEXT);
}

function createSelectionCard(e, originLanguage, destinationLanguage, inputText, outputText) {
    var builder = CardService.newCardBuilder();

    // "From" language selection & text input section
    var fromSection = CardService.newCardSection()
        .addWidget(CardService.newTextInput()
            .setFieldName('input')
            .setValue(inputText)
            .setTitle('Enter text...')
            .setMultiline(true));

    fromSection.addWidget(CardService.newButtonSet()
        .addButton(CardService.newTextButton()
            .setText('Get Selection')
            .setOnClickAction(CardService.newAction().setFunctionName('getSheetsSelection'))
            .setDisabled(false)));


    builder.addSection(fromSection);

    // "Translation" language selection & text input section
    builder.addSection(CardService.newCardSection()
        .addWidget(CardService.newTextInput()
            .setFieldName('output')
            .setValue(outputText)
            .setTitle('Translation...')
            .setMultiline(true)));

    //Buttons section
    builder.addSection(CardService.newCardSection()
        .addWidget(CardService.newButtonSet()
            .addButton(CardService.newTextButton()
                .setText('Translate')
                .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                .setOnClickAction(CardService.newAction().setFunctionName('translateText'))
                .setDisabled(false))
            .addButton(CardService.newTextButton()
                .setText('Clear')
                .setOnClickAction(CardService.newAction().setFunctionName('clearText'))
                .setDisabled(false))));

    return builder.build();

}
