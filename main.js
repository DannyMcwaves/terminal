//this is the module to create my first electron application and to develop
// everything i ever need to make my life more comfortable.

const electron = require('electron');
const {app} = electron;
const{BrowserWindow} = electron;
path = require('path');

let win;

function createWindow(){
  // now it is time to create a new browser window
  var win = new BrowserWindow({height: 650, width: 950});

  //using this to load the file that is supposed to display in the main
  // browser window.
  win.loadURL("file:///" + path.join(__dirname, "index.html"));

  // this is to open the development tools.
//  win.webContents.openDevTools();

  // this time we are adding an asychronuous event listener to the window object
  // for when it is closed.
  win.on("end", function (){
    // apparently, you would usually store all the window instances in a array,
    // but for now, let us just say, we have one and that we are closing it.
    win = null;
  });
}

// now we need to attach this function to the electron app
// so that when it is ready,
app.on("ready", createWindow);


//this main function is supposed to quit the electron program itself when all the
// windows in the application are closed

app.on("window-all-closed", function(){
  if (process.platform !== "darwin"){
    app.quit();
  }
});

app.on("activate", function(){
  // this is for if the app is on and thebn you want to create a new window.
  // this should be fairly simple and it applies basically to
  if (win === null){
    createWindow();
  }
});
