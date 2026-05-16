const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),
  onOpenPreferences: (callback) => ipcRenderer.on('open-preferences', callback),
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});

// Disable file drop functionality for security
document.addEventListener('dragover', (event) => {
  event.preventDefault();
  event.stopPropagation();
});

document.addEventListener('drop', (event) => {
  event.preventDefault();
  event.stopPropagation();
});
