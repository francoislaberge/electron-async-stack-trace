
// Series of nested async functions
function async1(){
    setTimeout( async2, 10 );
}
function async2(){
    setTimeout( async3, 10 );
}
function async3(){
    throw new Error('Whoops!');
}

// Start the async chain that generates an error
setTimeout( async1, 100 );


// Use onerror to capture unhandled exceptions.
// NOTE: We used window.onerror because it unlike 'uncaughtException' event handlers
// doesn't interfere with the default behavior DevTools behavior of logging a rich
// async call stack to the console.
window.onerror = function(messageOrEvent, source, lineno, colno, error){
    console.log(error.stack);
}
