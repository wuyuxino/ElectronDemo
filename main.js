const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const { join } = require("path");

async function createWindow() {
  const mainWindow = new BrowserWindow({
    minHeight: 700,
    minWidth: 1100,
    backgroundColor: '#2e2c29',
    titleBarStyle: 'hidden',
    // titleBarOverlay: true, // 默认放大缩小关闭
    frame: false, // 隐藏默认窗口菜单 自定义菜单
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: {
      nodeIntegration: true, // 允许在渲染进程中使用Node.js
      contextIsolation: false,
      preload: join(__dirname, "preload.js"),
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.on('maximize', () => {
    mainWindow?.webContents.send('isMaximized', mainWindow?.isMaximized())
  })

  mainWindow.on('unmaximize', () => {
    mainWindow?.webContents.send('isMaximized', mainWindow?.isMaximized())
  })


  mainWindow.loadURL("http://localhost:5173");


  // 自定义最大化事件
  ipcMain.on('maximize', (e) => {
    // 阻止默认行为
    e.preventDefault();
    // 自定义最大化逻辑
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  // 自定义最小化事件
  ipcMain.on('minimize', (e) => {
    // 阻止默认行为
    e.preventDefault();
    // 自定义最小化逻辑
    mainWindow.minimize();
  });

  // 自定义关闭窗口事件
  ipcMain.on('close', (e) => {
    e.preventDefault()
    dialog.showMessageBox({
      type: 'none',
      // title: '确定要关闭吗？',
      message: '确定要关闭吗？',
      cancelId: 2,
      defaultId: 0,
      textWidth: 340,
      buttons: ['最小化', '直接退出']
    }).then(result => {
      if (result.response == 0) {
        e.preventDefault();
        mainWindow.minimize();
      } else if (result.response == 1) {
        mainWindow.close();
      }
    }).catch(err => {
      console.log(err)
    })
  });

  // 是否最大化判断
  ipcMain.on('ismax', (event, data) => {
    let isMaximized = mainWindow.isMaximized();
    event.sender.send('isMaximized', isMaximized);
  })

  mainWindow.webContents.openDevTools({ mode: 'detach', activate: true });
}

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  })
  .catch((e) => console.error("Failed to crate window:", e));

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
