run:
- `npm run dev` for development
- `npm run build` for production build

todo: 
* [] js chunks don't go to ./dist/js
* [] sass doesn't compile
* [] add sourcemaps to sass compilation
* [] add postcss/autoprefixer to sass compilation (only evergreen browser support)

planned folder mapping:

html:
src/index.html => dist/index.html
src/templates/portfolio.html => dist/portfolio/portfolio.html

js:
src/js/*.js => dist/js/..

styles:
src/styles/*.sass => dist/css/..

images etc.
src/assets/images => dist/images

misc.

src/misc/robots.txt && src/misc/manifest.json => dist/

