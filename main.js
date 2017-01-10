const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path');

// See V8 flags here:
// https://chromium.googlesource.com/v8/v8/+/master/src/flag-definitions.h
//app.commandLine.appendSwitch('--stack_trace_limit', 100);
//app.commandLine.appendSwitch("js-flags", "--stack_trace_limit=7");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
      width: 1280,
      height: 720
  })




  // Load a temporary page just to have the devTools ready before a skill launches so
  // that better stack traces are available
    // This datauri is just this simple webpage = '<html></html>' generated via
    // http://dopiaza.org/tools/datauri/index.php
  mainWindow.loadURL("data:text/html;charset=utf-8,%3Chtml%3E%3C%2Fhtml%3E");
  mainWindow.webContents.openDevTools();
  mainWindow.webContents.once('devtools-opened', () => {
      // Automatically set the Async flag
      let script = 'WebInspector.moduleSetting("enableAsyncStackTraces").set(true)';
      mainWindow.webContents.devToolsWebContents.executeJavaScript(script, (result) => {
          // Load the page for real
          mainWindow.loadURL(`file://${__dirname}/index.html`)
      });
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
