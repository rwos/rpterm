'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600, title: 'rpterm'})
  mainWindow.setMenu(null)
  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

  if (process.argv.length === 3) {
    process.chdir(process.argv[2])
  }

  if (process.env.DEBUG) {
    mainWindow.webContents.openDevTools()
  }
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
