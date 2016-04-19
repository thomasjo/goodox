'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;
let isQuitting = false;

const shouldQuit = app.makeSingleInstance(() => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

if (shouldQuit) {
  app.quit();
  return;
}

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL('https://docs.google.com/document/');

  mainWindow.on('close', (event) => {
    if (isQuitting) return;
    event.preventDefault();
    app.hide();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  })
});

app.on('activate', () => {
  mainWindow.show();
});

app.on('before-quit', () => {
  isQuitting = true;
});
