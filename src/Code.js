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

