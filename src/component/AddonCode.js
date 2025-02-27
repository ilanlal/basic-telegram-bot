function onOpen(e) {
  // Add a custom menu to the active spreadsheet
  const addonMenu = new AddonMenu();
  addonMenu.addJsonStudionMenu();
  addonMenu.addTelegramBotMenu();
}

function onInstall(e) {
  onOpen(e);
}
