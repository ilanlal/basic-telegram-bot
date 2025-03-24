function onOpen(e) {
  // Add a custom menu to the active spreadsheet
  const addonMenu = new AddonMenu();
  addonMenu.addJsonStudionMenu(e);
  addonMenu.addTelegramBotMenu(e);
}

function onInstall(e) {
  onOpen(e);
}
