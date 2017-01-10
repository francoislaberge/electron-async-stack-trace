// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

function async1(){
    setTimeout( async2, 10 );
}
function async2(){
    setTimeout( async3, 10 );
}
function async3(){
    throw new Error('Whoops!');
}
setTimeout( async1, 100 );


window.onerror = function(messageOrEvent, source, lineno, colno, error){
    //debugger;
    console.error(error);
}


function causeErrors(level){
    if(level===0){
        throw new Error('Recursssiioon');
    }
    causeErrors(level-1);
}

window.causeErrors = causeErrors;
window.currentWindow = require('electron').remote.getCurrentWindow();


//console.log(window.currentWindow);

//causeErrors(10);



window.run = function(script){
    currentWindow.webContents.devToolsWebContents.executeJavaScript(script, (result) => {
        // Load the page for real
        console.log( result );
    });
}

//run('WebInspector');
