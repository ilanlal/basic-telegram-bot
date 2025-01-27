function doPost(e) {
    try {
        const handler = new AppHandlers();
        handler.handelDoPost(e);
    } catch (error) {
        console.error(error);
        Logger.log(error);
        throw new Error(error);
    }
}