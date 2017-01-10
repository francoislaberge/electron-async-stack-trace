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
