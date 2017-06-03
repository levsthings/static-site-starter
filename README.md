Development

- `npm run dev` for development with webpack dev-server and hot module replacement
- `npm run build` for optimized production build

#### Folder Structure


##### src

```
└───src
    ├───<assets>
    │   ├───<images>  // all images
    │   └───<misc> 	  // manifest.json and robots.txt
    ├───<js>
   	├───<styles>
    │    ├───<portfolio> 	// SASS for portfolio page
    │    ├───<landingPage>  // SASS for landing page
   	│	 └────app.sass 	    // SASS for global    
    │
    ├───<templates> 
    │    └────portfolio-item.html // Portfolio Page
    │ 
    ├───index.html // Landing Page 
    
 ```
 ##### dist
 
 ```
└───dist
	├───<css>	 // Compiled css
    ├───<images> // Images
    ├───<js>     // JS Bundles
    │
    ├───<portfolio> 
    │    └────portfolio-item.html // Portfolio Page
    │ 
    ├───index.html // Landing Page
    │
    ├───robots.txt
    ├───manifest.json
    
 ```


##### Current webpack issues:

* JavaScript code splitting works but all bundles go to `dist/` folder. They need to go to `/dist/js` and `html` files need to import them from this absolute path.
* SASS doesn't compile unless it's imported via a JavaScript file. It'd be better if all SASS files get auto-compiled.
* Sourcemaps needs to be added to `babel` and SASS compilation.
* Postcss/autoprefixer needs to be added to SASS compilation. (We'll only support evergreen browsers)
* All files needs to be transferred from `src/` to `dist/` based on folder structure.

