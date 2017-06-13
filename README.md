Todos: 
- Make sure that UglifyJS works as intended (with babel)
- Add .ejs support for templating

#### Usage

- Run `yarn dev` for development with webpack dev-server and hot module replacement
- Run `yarn build` for optimized production build
- Run `yarn serve` to build and serve the built assets to view things as a user

#### Goals:

- Showcase a two page static design (e.g. landing page  + contact us page)
- Build these pages using ES6 JavaScript and SASS

#### Desired Behavior:

##### Development:

- Hot reloading should work on CSS,JS and Markup
- Developer should have access to sourcemaps
- Developer should get useful error messages from Webpack

##### Build:

- Code chunking should seperate the outputted JavaScript for the showcased two pages
- Compiled JS should be minified and set to support the browser setting: "last 2 versions"
- Compiled CSS should be minified and prefixed to support the browser setting: "last 2 versions"
- Images should be copied, minified and referenced correctly in the compiled HTML


#### Folder Structure

##### Source Folder

```
└───src
    ├───<assets>
    │   ├───<images>      // all images
    │   └───<misc> 	  // manifest.json and robots.txt
    ├───<js>
    ├───<styles>
    │    ├───<anotherPage> 	// SASS for another page
    │    ├───<landingPage>      // SASS for landing page
    │    └────app.sass 	        // SASS for global    
    │
    ├───<templates> 
    │    └────portfolio-item.html // Portfolio Page
    │ 
    └───index.html // Landing Page 
    
 ```

 ##### Dist Folder
 
 ```
└───dist
	├───<css>	  // Compiled css
    ├───<images>   // Images
    ├───<js>       // JS Bundles
    │
    ├───<anotherPage> 
    │    └────another-page.html // Another Page
    │ 
    ├───index.html // Landing Page
    │
    ├───robots.txt
    └───manifest.json
    
 ```
