import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  // 注册 Hello World 命令
  const helloCmd = vscode.commands.registerCommand('date-extension.date-Extension', () => {
    vscode.window.showInformationMessage('Welcome to Date Status Bar extension!');
  });
  context.subscriptions.push(helloCmd);

  // 创建状态栏项，放在左侧优先级高的位置
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  context.subscriptions.push(statusBarItem);

  // 每秒更新一次日期显示
  updateDate();
  setInterval(updateDate, 1000);

  // 激活时显示
  statusBarItem.show();
}

function updateDate() {
  const now = new Date();
  // 格式化为 YYYY-MM-DD HH:mm:ss
  const dateString = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0') + ' ' +
    String(now.getHours()).padStart(2, '0') + ':' +
    String(now.getMinutes()).padStart(2, '0') + ':' +
    String(now.getSeconds()).padStart(2, '0');
  statusBarItem.text = `$(calendar) ${dateString}`;
  statusBarItem.tooltip = '当前日期和时间';
}

export function deactivate() {
  if (statusBarItem) {
    statusBarItem.dispose();
  }
}
