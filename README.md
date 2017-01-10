# Electron Async Stack Trace
Demonstration of the lack of ability to get the string (for logging purposes) of the async call stack that Chrome's DevTools has access to.

## Usage

 1. Clone / Install Dependencies

		git clone git@github.com:francoislaberge/electron-async-stack-trace.git
		cd electron-async-stack-trace
		npm install

 2. Make sure the Async Flag is checked
  
     <img src="async-flag.png"/>
 3. Running the application
 
		npm start
		
 4. Notice:
     - The red text created by DevTools, has full async call stack information including clickable links to the source of each function 
     - The grey text created by `console.log(error.stack)` has nothing but the last synchronous stack frame
     
     <img src="stack-trace.png"/>
     
 5. [See the `renderer.js` source to understand how this test was generated](https://github.com/francoislaberge/electron-async-stack-trace/blob/master/renderer.js#L3-L23)
 
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
 

