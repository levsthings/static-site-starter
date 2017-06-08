Todos: 
- Make sure that UglifyJS works as intended (with babel)
- Add .ejs support for templating

Development

- `yarn dev` for development with webpack dev-server and hot module replacement
- `yarn build` for optimized production build

#### Folder Structure


##### src

```
└───src
    ├───<assets>
    │   ├───<images>      // all images
    │   └───<misc> 	  // manifest.json and robots.txt
    ├───<js>
    ├───<styles>
    │    ├───<portfolio> 	// SASS for portfolio page
    │    ├───<landingPage>      // SASS for landing page
    │    └────app.sass 	        // SASS for global    
    │
    ├───<templates> 
    │    └────portfolio-item.html // Portfolio Page
    │ 
    └───index.html // Landing Page 
    
 ```
 ##### dist
 
 ```
└───dist
	├───<css>	  // Compiled css
    ├───<images>   // Images
    ├───<js>       // JS Bundles
    │
    ├───<portfolio> 
    │    └────portfolio-item.html // Portfolio Page
    │ 
    ├───index.html // Landing Page
    │
    ├───robots.txt
    └───manifest.json
    
 ```
